const PostModel = require("../models/BLOG");
const UserModel = require("../models/USER");

const CreatePost = async (req, res) => {
  const {
    header,
    article,
    images,
    categories,
    likes,
    comments,
    postOwner,
    createdOn,
    coverImage,
  } = req.body;

  console.log(req.body);
  try {
    const newPost = PostModel({
      header,
      article,
      images,
      categories,
      likes,
      comments,
      postOwner,
      createdOn,
      coverImage,
    });

    const user = await UserModel.findById(postOwner);
    user.posts.push(newPost);

    await user.save();
    await newPost.save();

    return res.json({
      success: true,
      message: "POST CREATED SUCCESSFULLY.",
      newPost,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "POST NOT CREATED.",
    });
  }
};

module.exports = CreatePost;
