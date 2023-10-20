const express = require("express");
const router = express.Router();
const CreatePost = require("../controllers/CreatePost.js");
const RemovePost = require("../controllers/RemovePost.js");
const PostModel = require("../models/BLOG.js");
const UserModel = require("../models/USER.js");
const CommentModel = require("../models/COMMENTS.js");
const verifyToken = require("../controllers/VerifyingToken.js");

router.post("/create", CreatePost);
router.post("/remove", RemovePost);
router.put(`/edit/:id`, async (req, res) => {
  const postId = req.params.id;
  const data = req.body;
  console.log(data);
  try {
    // if (![...data]) {
    //   return res.json({message: "You Must Provides Valid Data."});
    // }
    const post = await PostModel.findByIdAndUpdate({_id: postId}, {...data});
    post.lastUpdateOn = Date.now();
    await post.save();

    return res.json({
      message: "POST UPADTED SUCCESSFULLY.",
      success: true,
      post,
    });
  } catch (error) {
    return res.json({message: "Failed", error});
  }
});
//

router.get("/users/lastusers", async (req, res) => {
  try {
    const currentDate = new Date();

    const fiveDaysAgo = new Date(currentDate);

    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5); // Change this to -5

    const users = await UserModel.find({createdOn: {$gt: fiveDaysAgo}});
    return res.json({users});
  } catch (error) {
    return res.json({error});
  }
});

//
router.get("/posts", async (req, res) => {
  try {
    const Posts = await PostModel.find({});
    if (!Posts) {
      return res
        .status(404)
        .json({success: false, message: "No Posts Available."});
    }
    return res
      .status(200)
      .json({success: true, message: "Posts Find Successfully.", posts: Posts});
  } catch (error) {
    res.status(404).json({success: false, message: "Error Posts."});
  }
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const Post = await PostModel.findById(id);
    if (!Post) {
      return res.json("POST NOT FOUND");
    }
    return res.json({Post});
  } catch (error) {
    return res.json({error});
  }
});
router.post("/like", async (req, res) => {
  const {userId, postId} = req.body;

  try {
    const User = await UserModel.findById(userId);
    const Post = await PostModel.findById(postId);

    if (Post.likedBy.includes(userId)) {
      console.log("FOUND USER");
      Post.likedBy.splice(Post.likedBy.indexOf(userId), 1);
      await Post.save();
      return res.json({message: "Deleted Successfully.", post: Post});
    }

    Post.likedBy.push(userId);

    await Post.save();

    return res.json({post: Post});
  } catch (error) {}
});

router.post("/save", async (req, res) => {
  const {userId, postId} = req.body;
  try {
    const Post = await PostModel.findById(postId);
    console.log(Post);
    if (Post.savedBy.includes(userId)) {
      Post.savedBy.splice(Post.savedBy.indexOf(userId), 1);
      await Post.save();
      return res.json({message: "unSaved Successfully.", success: true});
    }

    Post.savedBy.push(userId);
    await Post.save();
    return res.json({message: "Saved Successfully.", success: true});
  } catch (error) {
    return res.json({message: "Save is failed"});
  }
});

router.get("/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId);
    const posts = await PostModel.find({_id: {$in: user.posts}});

    return res.json({
      refershedPosts: posts,
      user: user,
      message: "Refresh posts Successfully.",
      success: true,
    });
  } catch (error) {
    return res.json({message: "faileddd", success: false});
  }
});

router.get(`/user/save/:userId`, async (req, res) => {
  const {userId} = req.params;
  console.log(userId);

  try {
    const user = await UserModel.findById(userId);
    const savedPosts = await PostModel.find({savedBy: {$in: user.id}});

    console.log(savedPosts);

    return res.json({message: "Posts Find Successfully.", posts: savedPosts});
  } catch (error) {
    return res.json({message: "Posts Not Found", error});
  }
});

router.post("/comment", async (req, res) => {
  const postId = req.body.postId;
  const userId = req.body.userId;
  const comment = req.body.comment;

  try {
    // const Post = await PostModel.findById(req.body.postId);
    const newComment = new CommentModel({
      userId: userId,
      postId: postId,
      comment: comment,
      createdOn: Date.now(),
    });

    //
    await newComment.save();

    return res.json({
      message: "Created comment Successfully.",
      newComment,
      success: true,
    });
  } catch (error) {
    return res.json({message: "Failed", success: false});
  }
});
router.post("/getComments", async (req, res) => {
  const {postId} = req.body;

  try {
    const comments = await CommentModel.find({postId: postId});

    const userId = comments.map((item) => {
      console.log(item.userId);
      return item.userId;
    });

    const users = await UserModel.find({_id: {$in: userId}});

    const commentsWithUsers = comments.map((comment, index) => {
      // const user = users.find((user) => user._id.equals(comment.userId));
      const user = users.find((user) => user._id.equals(comment.userId));

      return {
        ...comment.toObject(),
        user: user.toObject(),
      };
    });

    return res.json({
      users,
      message: "Comments Find Successfully.",
      comments: commentsWithUsers,
      success: true,
    });
  } catch (error) {
    return res.json({message: "Comments not Found.", success: false});
  }
});
router.post("/comment/like", async (req, res) => {
  const {userId, commentId} = req.body;

  try {
    const Comment = await CommentModel.findById(commentId);

    console.log(Comment.likes);

    if (Comment.likes.includes(userId)) {
      const index = Comment.likes.indexOf(userId);
      Comment.likes.splice(index, 1);
      await Comment.save();
      return res.json({message: "Like Deleted successfully.", success: true});
    }

    Comment.likes.push(userId);
    await Comment.save();
    return res.json({message: "Like Added Successfully.", success: true});
  } catch (error) {
    return res.json({message: "Failed.", success: false});
  }
});

// Get Commnets

module.exports = router;
