import React, { Component } from "react";
import TextInput from "../common/TextInput";
import { connect } from "react-redux";
import { loginUser } from "../../action/authAction";
import PropTypes from "prop-types";

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
  onSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.loginUser(loginData, this.props.history);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  render() {
    return (
      <div className="loginForm">
        <div className="container">
          <form className="loginInputForm" onSubmit={this.onSubmit}>
            <TextInput
              name="username"
              type="text"
              placeholder="Enter username"
              value={this.state.username}
              onChange={this.onChange}
              error={this.state.errors.username}
            />
            <TextInput
              name="password"
              type="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.onChange}
              error={this.state.errors.password}
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
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.error,
});
export default connect(mapStateToProps, { loginUser })(Login);
