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

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  }
});

var upload = multer({ storage: storage });

var serviceAccount;
if (process.env.firebaseServiceAccount) {
  serviceAccount = process.env.firebaseServiceAccount;
} else {
  serviceAccount = JSON.parse(config.get("firebaseServiceAccount"));
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://review-salad.appspot.com"
});

var storageRef = admin.storage();
var bucket = admin.storage().bucket();

router.post("/", [auth, upload.single("image")], async (req, res) => {
  bucket.makePublic({ includeFiles: true });

  const user = await User.findById({ _id: new ObjectId(req.user.id) }).select(
    "-password"
  );

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // const { subject, preview, review, image, imageName } = req.body;
  console.log("req.body");
  console.log(req.body);
  let extension = "";
  let isImage = false;
  let isCharacterLimit = false;
  switch (req.file.mimetype) {
    case "image/png":
      extension = ".png";
      isImage = true;
    case "image/jpg":
      extension = ".jpg";
      isImage = true;
  }
  req.body.preview.length <= 120
    ? (isCharacterLimit = true)
    : (isCharacterLimit = false);
  if (isImage) {
    await bucket.upload(
      `uploads/${req.file.filename}`,
      async (err, file, apiResponse) => {
        // bucket.
        console.log("apiResponse");
        console.log(apiResponse);

        const imageUrl = `https://storage.googleapis.com/review-salad.appspot.com/${
          apiResponse.name
        }`;
        const subject = req.body.subject;
        const preview = req.body.preview;
        const review = req.body.review;

        const post = new Post({
          imageUrl: imageUrl,
          reviewSubject: subject,
          reviewPreview: preview,
          fullReview: review
        });
        await post.save();
      }
    );
  }
  isImage && isCharacterLimit
    ? res.status(200).send(req.body)
    : res
        .status(400)
        .send("Apenas imagens JPEG ou PNG, preview máx 120 caracteres");
});

module.exports = router;
