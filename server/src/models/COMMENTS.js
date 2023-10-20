const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  createdOn: {type: Date, default: Date.now},
  comment: {type: String, required: true, lowerCase: true},
  // CommentCreator
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  postId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "blogs"},

  likes: [{type: mongoose.Schema.Types.ObjectId, ref: "users"}],
});

const CommentModel = mongoose.model("comments", CommentSchema);

module.exports = CommentModel;
