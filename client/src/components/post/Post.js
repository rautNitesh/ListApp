import React, { Component } from "react";
import PostInput from "./PostInput";
import { connect } from "react-redux";
import { getPost } from "../../action/postAction";
import PropTypes from "prop-types";

class Post extends Component {
  componentDidMount() {
    this.props.getPost();
  }
  render() {
    const { posts } = this.props.post;
    console.log(posts);

    const postView = posts.map((post, index) => (
      <div className="postList">
        <img
          className="postImage"
          src={`/public/uploads/${post.userPhoto}`}
          alt="pp"
        />
        <h3 className="postText">{post.text}</h3>
      </div>
    ));

    const { auth } = this.props;
    return (
      <div className="postDiv">
        {auth.isAuthenticated ? (
          <>
            <PostInput />{" "}
            <input type="button" className="btn btn-submit" value="Submit" />
          </>
        ) : (
          ""
        )}
        {postView}
      </div>
    );
  }
}
Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.error,
  post: state.post,
});
export default connect(mapStateToProps, { getPost })(Post);
