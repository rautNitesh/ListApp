import React, { Component } from "react";
import TextInput from "../common/TextInput";

class Register extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    errors: {},
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state.username);
  };
  render() {
    return (
      <div className="registerForm">
        <div className="container">
          <form className="registerInputForm">
            <TextInput
              name="username"
              type="text"
              placeholder="Enter username"
              value={this.state.username}
              onChange={this.onChange}
              error={this.state.errors.username}
            />
            <TextInput
              name="email"
              type="text"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.onChange}
              error={this.state.errors.email}
            />
            <TextInput
              name="password"
              type="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.onChange}
              error={this.state.errors.password}
            />
            <TextInput
              name="password2"
              type="password"
              placeholder="Enter confirm password"
              value={this.state.password2}
              onChange={this.onChange}
              error={this.state.errors.password2}
            />
            <input type="button" className="btn btn-submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
