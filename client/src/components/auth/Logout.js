import React, { Component } from "react";
import { removeCurrentUser } from "../../action/authAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
class Logout extends Component {
  onSubmit = (e) => {
    e.preventDefault();
    this.props.removeCurrentUser();
  };
  render() {
    const { auth } = this.props;
    return (
      <div>
        {auth.isAuthenticated ? (
          <button
            type="button"
            onClick={this.onSubmit}
            className="btn btn-logout">
            LogOut
          </button>
        ) : (
          <Link to="/login">Log In</Link>
        )}
      </div>
    );
  }
}
Logout.propTypes = {
  removeCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { removeCurrentUser })(Logout);
