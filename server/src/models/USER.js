const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  username: {
    type: String,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: String,

  createdOn: {type: Date, default: Date.now},

  posts: [{type: mongoose.Schema.Types.ObjectId, ref: "posts"}],
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
