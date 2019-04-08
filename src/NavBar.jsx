import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="navbar-online">Current Users Online: {this.props.usersOnline}</span>
      </nav>
    );
  }
}
export default NavBar;