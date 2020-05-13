const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const registerFormValidator = require("../validator/registerFormValidator");

const User = require("../model/User");

router.get("/", (req, res) => res.send("Hola"));

router.post("/register", (req, res) => {
  const { errors, isValid } = registerFormValidator(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      errors.username = "Username Already Exists";
      return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      }
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
          }
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              return res.json(user);
            })
            .catch((err) => {
              return res.json(err);
            });
        });
      });
    });
  });
});

module.exports = router;
1;
