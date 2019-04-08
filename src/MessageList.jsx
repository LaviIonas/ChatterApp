import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    //Loop through each possible message in order to display it
    const listOfMsg = this.props.messages.msg.map((message) => {
      return (
              <Message
                key = {message.id}
                type = {message.type}
                username = {message.username}
                content = {message.content}
              />
        );
    });
    return (
      <main className="messages">
        {listOfMsg}
      </main>
    );
  }
}
export default MessageList;