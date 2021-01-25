const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const loginMiddleware = require("../middleware/loginMiddleware");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

router.get("/user/:id", loginMiddleware, (req, res) => {
  User.findOne({ _id: req.params.id })

    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.json({ user, posts });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "User Not Found" });
    });
});

//FOLLOW ROUTE

router.put("/follow", (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { follower: req.user._id },
    },
    { new: true },
    (err, result) => {
      if (err) {
        res.status(422).json({ err: error });
      }
    }
  );
  User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { following: req.body.followId },
    },
    { new: true }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

//UNFOLLOW ROUTE

router.put("/unfollow", (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { follower: req.user._id },
    },
    { new: true },
    (err, result) => {
      if (err) {
        res.status(422).json({ err: error });
      }
    }
  );
  User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { following: req.body.unfollowId },
    },
    { new: true }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

module.exports = router;
