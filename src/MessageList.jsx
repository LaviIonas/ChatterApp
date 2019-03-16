import React, {Component} from 'react';

class MessageList extends Component {
  render() {
    console.log("In message list:",this.props.messages.msg);
    const listOfMsg = this.props.messages.msg.map((message, i) => {
      return (
        <div className="message" key = {i}>
            <span className="message-username" key = {this.props.messages.msg.id}>
              {message.username}
            </span>
            <span className="message-content">
              {message.content}
              <br />
              </span>
        </div>
        )
    });
    console.log(listOfMsg);
    return (
      <main className="messages">
          {listOfMsg}
        {/*
          <div className="message system">
            Anonymous1 changed their name to nomnom.
          </div>
        */}

        </main>
    );
  }
}
export default MessageList;