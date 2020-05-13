const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const app = express();

const posts = require("./routes/posts");
const users = require("./routes/users");

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", users);
app.use("/posts", posts);

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
