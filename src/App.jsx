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
      messages: message
    }
  }

//--
  componentDidMount() {
    console.log("componentDidMount in App");

    this.socket.onmessage = (event) =>{
      counter++;
      let incomingMsg = JSON.parse(event.data)
      const newMessage = {id: counter, username: incomingMsg.username, content: incomingMsg.message}
      this.setState ({
        currentUser: incomingMsg.username,
        messages: {
          msg: [...this.state.messages.msg, newMessage]
        }
      })
    }

    setTimeout(() => {
      console.log("Simulating msg");
      const newMessage = {id: "rand3", username: "Maya", content: "I have your marbles!"};
      this.setState({
        messages: {
          msg: [...this.state.messages.msg, newMessage]
        }
      })
    }, 3000)
  }

  handleInputName = (name) => {
      // console.log("Name from App.js",name);
      // console.log("IM SENDING NOW")
      // this.socket.send(name);
      // this.setState({
      //   currentUser: name
      // })
      /*
      // Send text to all users through the server

      */
    }
  handleInputMsg = (msg, name) => {
    var message = {
      message: msg,
      username: name,
    }
    this.socket.send(JSON.stringify(message));
  }


  render() {
    console.log("in app", this.state)
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
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
