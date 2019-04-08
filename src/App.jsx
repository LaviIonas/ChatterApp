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
      messages: {msg: []}
    }
  }
//--
  componentDidMount() {

    this.socket.onmessage = (event) =>{
      let incomingMsg = JSON.parse(event.data);

      if(incomingMsg.type === "Message"){
        //Creates new object for the message
        const newMessage = {
          id: incomingMsg.id,
          username: this.state.currentUser,
          content: incomingMsg.content,
          type: incomingMsg.type}
        this.setState ({
          messages: {
            msg: [...this.state.messages.msg, newMessage]
          }
        })
      }
      if(incomingMsg.type === "Notification") {
        //Creates new object for the notification
        const newName = {
          id: incomingMsg.id,
          type: incomingMsg.type,
          content: `User ${this.state.currentUser} changed their name to ${incomingMsg.content}!`}
        this.setState ({
          messages: {
            msg: [...this.state.messages.msg, newName]
          },
          currentUser: incomingMsg.content
        })
      }
      if(incomingMsg.type === "Status"){
        this.setState({
          usersOnline: incomingMsg.onlineCount
        })
      }
    }
  }
  //handles incoming name change from ChatBar
  handleInputName = (name) => {
    //Build new object and send it to the websocket
    let message = {
      type: "Notification",
      content: name
    }
    this.socket.send(JSON.stringify(message));
  }
  //handles incoming new message from ChatBar
  handleInputMsg = (msg) => {
    //Build new object and send it to the websocket
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
        <NavBar usersOnline = {this.state.usersOnline}/>
        <main>
          <MessageList messages = {this.state.messages}/>
          <Chatbar currentUser = {this.state.currentUser}
                   handleInputName = {this.handleInputName}
                   handleInputMsg = {this.handleInputMsg}/>
        </main>
      </div>
    );
  }
}
export default App;