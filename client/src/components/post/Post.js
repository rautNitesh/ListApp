import React, { Component } from "react";
import PostInput from "./PostInput";

class Post extends Component {
  state = [
    {
      text: "This is post text isto show.",
      profilePicture:
        "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
    },
    {
      text: "This is post text.",
      profilePicture:
        "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
    },
  ];
  render() {
    const posts = this.state;
    return (
      <div className="postDiv">
        <PostInput />
        <input type="button" className="btn btn-submit" value="Submit" />

        {posts.map((post, index) => (
          <div className="postList">
            <img className="postImage" src={post.profilePicture} alt="pp" />
            <h3 className="postText">{post.text}</h3>
          </div>
        ))}
      </div>
    );
  }
}

export default Post;
