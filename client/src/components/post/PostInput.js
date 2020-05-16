import React, { Component } from "react";
import TextInput from "../common/TextInput";

class PostInput extends Component {
  state = {
    text: "",
    errors: "",
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state.text);
  };
  render() {
    return (
      <div>
        <TextInput
          name="text"
          type="text"
          placeholder="Enter text"
          value={this.state.text}
          onChange={this.onChange}
          error={this.state.errors.text}
        />
      </div>
    );
  }
}

export default PostInput;
