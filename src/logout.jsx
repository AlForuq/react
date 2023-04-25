import React, { Component } from "react";

class LoginOut extends Component {
  render() {
    return (
      <div>
        <h1>LoginOut</h1>
        <h5 onClick={() => this.props.onHandleClick(true)}>
          Already Login? <i>Login</i>
        </h5>
      </div>
    );
  }
}

export default LoginOut;
