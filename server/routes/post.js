const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const loginMiddleware = require("../middleware/loginMiddleware");
const Post = mongoose.model("Post");

//Create a post route

router.post("/createpost", loginMiddleware, (req, res) => {
  const { title, body, picUrl } = req.body;

  if (!title || !body || !picUrl) {
    res.status(422).json({ error: "Please fill in the required fileds" });
  }

  req.user.password = undefined; //this will prevent the password being stored in the DB
  const post = new Post({
    title,
    body,
    photo: picUrl,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get all posts route

router.get("/allposts", (req, res) => {
  Post.find()
    .populate("postedBy", "_id name") //populate the 'postedBy' with only id and name
    .then((posts) => {
      res.json({ posts: posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get posts from the logged in user

router.get("/myposts", loginMiddleware, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Like

router.put("like", loginMiddleware, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

//Unlike

router.put("unlike", loginMiddleware, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
