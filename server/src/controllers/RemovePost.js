const PostModel = require("../models/BLOG.js");
const UserModel = require("../models/USER.js");

const RemovePost = async (req, res) => {
  const {postId, userId} = req.body;

  console.log(postId, userId);
  try {
    const Post = await PostModel.findByIdAndRemove(postId);
    const user = await UserModel.findById(userId);

    if (user.posts.includes(postId)) {
      const postIndex = user.posts.indexOf(postId);
      user.posts.splice(postIndex, 1);
      user.save();
      return res.json({
        message: "Remove Post from user successfully.",
        userPosts: user.posts,
      });
    }

    return res.json({message: "Post Deleted Successfully.", success: true});
  } catch (error) {
    return res.json({message: "Post Deleted Failed.", success: false});
  }
};

module.exports = RemovePost;
