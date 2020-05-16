const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const key = require("../config/keys").secretOrKey;
const registerFormValidator = require("../validator/registerFormValidator");
const loginFormValidator = require("../validator/loginFormValidator");

const User = require("../model/User");

router.get("/", (req, res) => res.send("Hola"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/register", upload.single("profilePicture"), (req, res) => {
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
        profilePicture: req.file.path,
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

router.post("/login", (req, res) => {
  const { errors, isValid } = loginFormValidator(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        errors.username = "Username not found";
        res.status(4040).json(errors);
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (isMatch) {
          const payload = {
            id: user._id,
            username,
            password,
          };
          jwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          });
        } else {
          errors.password = "Invalid password";
          res.status(400).json(errors);
        }
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
1;
