import React, {Component} from 'react';
let msg = '';
let name = '';

class ChatBar extends Component {
  handleKeyPressMsg = (event) => {
      if(event.key == 'Enter'){
        event.preventDefault();
        msg = event.target.value;
        this.props.handleInputMsg(msg, name);
      }
  }
  handleKeyPressName = (event) => {
      if(event.key == 'Enter'){
        event.preventDefault();
        name = event.target.value;
        this.props.handleInputName(name);
      }
  }
  render() {
    return (
      <footer className="chatbar">
          <input className="chatbar-username"
                 placeholder={this.props.currentUser}
                 onKeyPress = {this.handleKeyPressName}/>
          <input className="chatbar-message"
                 placeholder="Type a message and hit ENTER"
                 onKeyPress = {this.handleKeyPressMsg}/>
      </footer>
    );
  }
}
export default ChatBar;
