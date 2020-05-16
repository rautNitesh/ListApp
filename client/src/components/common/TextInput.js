import React from "react";

const TextInput = ({ type, name, error, placeholder, value, onChange }) => {
  const cl = error ? "textInput Red" : "textInput";
  return (
    <div className="inputContainer">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cl}
      />
      {error && <small className="invalid-feedback">{error}</small>}
    </div>
  );
};

export default TextInput;
