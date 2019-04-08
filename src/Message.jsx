import React, {Component} from 'react';


// function getClassForMessageType(messageType) {
//   if(messageType === "Message"){
//     return "message";
//   } else if (messageType === "Notification") {
//     return "name-change";
//   } else {
//     return "";
//   }
// }

class Message extends Component {
  render() {
    // const username = this.props.username || "Anonymous";
    // let content = this.props.content;


    // style={divStyle}
    // className={getClassForMessageType(this.props.type)}
    return (
        <div>
        <span className="username">{username}</span>
        <span className="content">{content}</span>
      </div>


    );
  }
}



export default Message;