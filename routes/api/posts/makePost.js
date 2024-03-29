const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const User = require("../../../models/User");
const Post = require("../../../models/Post");
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
var ObjectId = require("mongoose").Types.ObjectId;
var firebase = require("firebase");
const config = require("config");
var admin = require("firebase-admin");
var path = require("path");
var fs = require("fs");
let sanitizeUserInput = require("../../../utils/sanitizeUserInput");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

var upload = multer({ storage: storage });

var serviceAccount;
if (process.env.firebaseServiceAccount) {
  serviceAccount = JSON.parse(process.env.firebaseServiceAccount);
} else {
  serviceAccount = config.get("firebaseServiceAccount");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://review-salad-47f83.appspot.com",
});

var storageRef = admin.storage();
var bucket = admin.storage().bucket();

router.post("/", [auth, upload.single("image")], async (req, res) => {
  bucket.makePublic({ includeFiles: true });

  const user = await User.findById({ _id: new ObjectId(req.user.id) });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }
  let cleanSubject = sanitizeUserInput(req.body.subject);
  let cleanReview = sanitizeUserInput(req.body.review);
  let cleanPreview = sanitizeUserInput(req.body.preview);

  let extension = "";
  let isImage = false;
  let isCharacterLimit = false;

  switch (req.file.mimetype) {
    case "image/png":
      extension = ".png";
      isImage = true;
    case "image/jpg":
    case "image/jpeg":
      extension = ".jpg";
      isImage = true;
  }

  cleanPreview.length <= 120
    ? (isCharacterLimit = true)
    : (isCharacterLimit = false);
  if (isImage) {
    let filePathAndName = `uploads/${req.file.filename}`;
    await bucket.upload(filePathAndName, async (err, file, apiResponse) => {
      const imageUrl = `https://storage.googleapis.com/review-salad-47f83.appspot.com/${apiResponse.name}`;
      const subject = cleanSubject;
      const preview = cleanPreview;
      const review = cleanReview;

      const post = new Post({
        user: user,
        imageUrl: imageUrl,
        reviewSubject: subject,
        reviewPreview: preview,
        fullReview: review,
      });
      await post.save();
      fs.unlink(filePathAndName, (err) => {
        if (err) throw err;
        console.log("path/file.txt was deleted");
      });
    });
  }
  isImage && isCharacterLimit
    ? res.status(200).send(req.body)
    : res
        .status(400)
        .send("Apenas imagens JPEG ou PNG, preview máx 120 caracteres");
});

module.exports = router;
