import React, { Component } from "react";
import TextInput from "../common/TextInput";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {},
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div className="loginForm">
        <div className="container">
          <form className="loginInputForm">
            <TextInput
              name="username"
              type="text"
              placeholder="Enter username"
              value={this.state.username}
              onChange={this.onChange}
              error={this.state.errors.name}
            />
            <TextInput
              name="password"
              type="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.onChange}
              error={this.state.errors.password}
            />
            <input type="button" className="btn btn-submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
