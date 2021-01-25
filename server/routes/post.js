const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const loginMiddleware = require("../middleware/loginMiddleware");
const Post = mongoose.model("Post");

//CREATE A POST

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

//GET ALL POSTS

router.get("/allposts", (req, res) => {
  Post.find()
    .populate("postedBy", "_id name") //populate the 'postedBy' with only id and name
    .populate("comments.postedBy", "_id name")
    .then((posts) => {
      res.json({ posts: posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

//GET POSTS FROM LOGGED IN USER

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

//LIKE

router.put("/like", loginMiddleware, (req, res) => {
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

//UNLIKE

router.put("/unlike", loginMiddleware, (req, res) => {
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

//COMMENT

router.put("/comment", loginMiddleware, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

//DELETE POST

router.delete("/deletepost/:postId", loginMiddleware, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

//GET POSTS FROM USERS THAT ACTIVE USER FOLLOWS

router.get("/followedusersposts", loginMiddleware, (req, res) => {
  //$in:req.user.following only finds the post of the users i am following!
  Post.find({ postedBy: { $in: req.user.following } })
    .populate("postedBy", "_id name") //populate the 'postedBy' with only id and name
    .populate("comments.postedBy", "_id name")
    .then((posts) => {
      res.json({ posts: posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
