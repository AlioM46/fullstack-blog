const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  header: {type: String, lowercase: true},
  article: [{type: String, lowercase: true}],
  coverImage: [{type: String}],
  images: [String],
  categories: [{type: String, lowercase: true}],
  likes: Number,
  postOwner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  createdOn: {type: Date, default: Date.now, required: true},
  lastUpdateOn: {type: Date},
  likedBy: [{type: mongoose.Schema.Types.ObjectId, ref: "users"}],
  savedBy: [{type: mongoose.Schema.Types.ObjectId, ref: "users"}],
});

const PostModel = mongoose.model("blog", PostSchema);

module.exports = PostModel;
