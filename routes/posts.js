const express = require("express");
const multer = require("multer");
const router = express.Router();
const passport = require("passport");
const Post = require("../model/Post");
const postFormValidator = require("../validator/postFormValidator");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/profile");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("photo"),

  (req, res) => {
    const { errors, isValid } = postFormValidator(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      photo: req.file.path,
      user: req.user.id,1
    });
    newPost
      .save()
      .then((post) => res.json(post))
      .catch((err) => res.status(400).json(err));
  }
);

router.get("/", (req, res) => res.send("Hola"));

module.exports = router;
