const express = require("express");
const multer = require("multer");
const router = express.Router();
const passport = require("passport");
const Post = require("../model/Post");
const postFormValidator = require("../validator/postFormValidator");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
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
    let file;
    if (req.file) {
      file = req.file.filename;
    }
    const newPost = new Post({
      text: req.body.text,
      photo: file,
      user: req.user.id,
      userPhoto: req.user.profilePicture,
    });
    newPost
      .save()
      .then((post) => res.json(post))
      .catch((err) => res.status(400).json(err));
  }
);

router.get("/", (req, res) => {
  Post.find().then((post) => {
    if (!post) {
      res.status(404).json({ nopost: "No posts found" });
    } else {
      res.json(post);
    }
  });
});

module.exports = router;
