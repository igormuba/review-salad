const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const User = require("../../../models/User");
const Post = require("../../../models/Post");
const Comment = require("../../../models/Comment");
var ObjectId = require("mongoose").Types.ObjectId;

let sanitizeUserInput = require("../../../utils/sanitizeUserInput");

router.post("/post", auth, async (req, res) => {
  const user = await User.findById({ _id: new ObjectId(req.user.id) });
  let cleanComment = sanitizeUserInput(req.body.comment);
  console.log("req.body");
  console.log(req.body);

  let post = await Post.findById({ _id: new ObjectId(req.body.post) });
  let newComment = new Comment({
    user: user,
    post: post,
    comment: cleanComment
  });
  await newComment.save();
});

router.get("/post", async (req, res) => {
  try {
    let comments = await Comment.find({ post: new ObjectId(req.query.post) })
      .sort([["date", "descending"]])
      .limit(5);
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
