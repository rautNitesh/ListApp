const Validator = require("validator");
const isValid = require("./is-empty");

module.exports = registerFormValidator = (data) => {
  let errors = {};
  data.username = !isValid(data.username) ? data.username : "";
  data.email = !isValid(data.email) ? data.email : "";
  data.password = !isValid(data.password) ? data.password : "";
  data.password2 = !isValid(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "email field is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwrod mismatch";
  }
  return {
    errors,
    isValid: isValid(errors),
  };
};
