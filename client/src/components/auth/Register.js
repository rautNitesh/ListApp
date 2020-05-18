import React, { Component } from "react";
import TextInput from "../common/TextInput";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../../action/authAction";

class Register extends Component {
  state = {
    username: "",
    password: "",
    password2: "",
    email: "",
    errors: {},
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = (e) => {
    console.log("vayo");

    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    return (
      <div className="registerForm">
        <div className="container">
          <form className="registerInputForm" onSubmit={this.onSubmit}>
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
            <button type="submit" className="btn btn-submit" value="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.error,
});
export default connect(mapStateToProps, { registerUser })(Register);
