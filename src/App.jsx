import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import message from './message';
let counter = 0;

class App extends Component {
  constructor() {
    super();
    this.socket = new WebSocket("ws://0.0.0.0:3001/");

    this.state = {
      currentUser: message.currentUser.name,
      usersOnline: 1,
      messages: message
    }
  }

//--
  componentDidMount() {
    function getOnline (online) {
      this.setState({usersOnline: online});
    }
    this.socket.onmessage = (event) =>{
      counter++;
      let incomingMsg = JSON.parse(event.data);
      getOnline(incomingMsg.usersOnline);
      if(incomingMsg.aMsg){
        const newMessage = {id: counter, username: this.state.currentUser, content: incomingMsg.message}
        this.setState ({
          messages: {
            msg: [...this.state.messages.msg, newMessage]
          }
        })
      } else if (incomingMsg.nameChange){
        const newName = {id: counter, username: incomingMsg.name, content: `-${this.state.currentUser}- changed their name to -${incomingMsg.name}-`}
        this.setState ({
          currentUser: incomingMsg.name,
          messages: {
            msg: [...this.state.messages.msg, newName]
          }
        });
      }
    }
  }

  handleInputName = (name) => {
    let message = {
      name: name,
      aMsg: false,
      nameChange: true
    }
    this.socket.send(JSON.stringify(message));
  }
  handleInputMsg = (msg) => {
    let message = {
      message: msg,
      aMsg: true,
      nameChange: false
    }
    // console.log("message about to be sent to WebSocket", message);
    this.socket.send(JSON.stringify(message));
  }
  render() {
    console.log("in app", this.state)
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span>{this.state.usersOnline}</span>
        </nav>
        <MessageList messages = {this.state.messages}/>
        <Chatbar currentUser = {this.state.currentUser}
                 handleInputName = {this.handleInputName}
                 handleInputMsg = {this.handleInputMsg}/>
      </div>
    );
  }
}
export default App;
