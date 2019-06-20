const express = require("express");
const router = express.Router();

router.use("/public", require("./posts/publicPosts"));
router.use("/new", require("./posts/makePost"));
router.use("/comment", require("./posts/commentPost"));

module.exports = router;
