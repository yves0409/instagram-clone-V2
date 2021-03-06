const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

//Auth Schema

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    default:
      "https://res.cloudinary.com/yves/image/upload/v1611611662/fyais0woveovnp4tvtmx.jpg",
  },
  follower: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
});

mongoose.model("User", userSchema);
