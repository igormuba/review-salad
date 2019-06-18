const express = require("express");
const router = express.Router();

router.use("/public", require("./posts/publicPosts"));
router.use("/new", require("./posts/makePost"));

module.exports = router;
