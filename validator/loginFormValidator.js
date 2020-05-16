const Validator = require("validator");
const isValid = require("./is-empty");

module.exports = loginFormValidator = (data) => {
  let errors = {};
  data.username = !isValid(data.username) ? data.username : "";
  data.password = !isValid(data.password) ? data.password : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }

  return {
    errors,
    isValid: isValid(errors),
  };
};
