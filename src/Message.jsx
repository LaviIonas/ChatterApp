import React, {Component} from 'react';

class Message extends Component {
  render() {
    const username = this.props.username || "Anonymous";
    let content = this.props.content;
    let type = this.props.type;

    if(type === "Message"){
      return (
          <div className = "message">
            <span className="message-username">{username}</span>
            <span className="message-content">
              {`${content}`}
              <br/>
            </span>
          </div>
        );
    } else if (type === "Notification"){
      return (
          <div className = "message">
            <span className="not-content">
              {`${content}`}
              <br/>
            </span>
          </div>
        );
   } else {
    return (
      <div>Error</div>
      );
   }


  }
}

export default Message;