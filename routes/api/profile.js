const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator/check");
const mongoose = require("mongoose");
let ObjectId = mongoose.Types.ObjectId;

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: "No profile found" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/profile", async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: ObjectId(req.query.user) });
    const user = await User.findOne({ _id: ObjectId(req.query.user) });
    console.log(user);
    if (!profile) {
      return res.status(404).json({ msg: "No profile found" });
    }
    res.json({ profile, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [auth /*, check('status', 'Status is required').not().isEmpty()*/],
  async (req, res) => {
    const { bio, youtube, facebook, twitter, instagram, discord } = req.body;

    let profileFields = {};
    profileFields.user = req.user.id;
    if (bio) {
      console.log("tem bio");
      profileFields.bio = bio;
    }
    const social = {};
    profileFields.social = social;

    if (youtube) {
      profileFields.social.youtube = youtube;
    }
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (discord) profileFields.social.discord = discord;

    console.log("profile");
    console.log(profileFields);

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      } else {
        profile = new Profile(profileFields);
        await profile.save();
        return res.json(profile);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
