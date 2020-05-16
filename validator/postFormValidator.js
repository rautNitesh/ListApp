const Validator = require("validator");
const isValid = require("./is-empty");

module.exports = loginFormValidator = (data) => {
  let errors = {};
  data.text = !isValid(data.text) ? data.text : "";

  if (Validator.isEmpty(data.text)) {
    errors.text = "text field is required";
  }

  return {
    errors,
    isValid: isValid(errors),
  };
};
