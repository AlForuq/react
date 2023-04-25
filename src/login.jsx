import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <h5 onClick={() => this.props.onHandleClick(false)}>
          Haven't Register? <i>Register</i>
        </h5>
      </div>
    );
  }
}

export default Login;
