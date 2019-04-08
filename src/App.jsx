import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor() {
    super();
    this.socket = new WebSocket("ws://0.0.0.0:3001/");

    this.state = {
      currentUser: "Anon",
      usersOnline: 0,
      messages: []
    }
  }

//--
  componentDidMount() {

    this.socket.onmessage = (event) =>{
      let incomingMsg = JSON.parse(event.data);

      if(incomingMsg.type === "Message"){
        console.log("This is what I recieve upon message: ", incomingMsg);
      }
      if(incomingMsg.type === "Notification") {
        console.log("This is what I recieve upon notification: ", incomingMsg);
      }
      if(incomingMsg.type === "Status"){
        console.log("This is what I recieve upon status: ", incomingMsg);
      }
    }
  }

  handleInputName = (name) => {
    let message = {
      type: "Notification",
      username: name,
      content: ""
    }
    this.socket.send(JSON.stringify(message));
  }
  handleInputMsg = (msg) => {
    let message = {
      type: "Message",
      username: this.state.currentUser,
      content: msg,
    }
    this.socket.send(JSON.stringify(message));
  }
  render() {
    return (
      <div>
        <NavBar />
        <main>
          <MessageList messages={this.state.messages}/>
          <Chatbar currentUser = {this.state.currentUser}
                   handleInputName = {this.handleInputName}
                   handleInputMsg = {this.handleInputMsg}/>
        </main>
      </div>
    );
  }
}
export default App;