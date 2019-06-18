const express = require("express");
const Post = require("../../../models/Post");
const router = express.Router();

const config = require("config");
var ObjectId = require("mongoose").Types.ObjectId;

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort([["date", "descending"]])
      .limit(5);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
