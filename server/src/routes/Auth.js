const express = require("express");
const router = express.Router();
const Login = require("../controllers/Login.js");
const Register = require("../controllers/Register.js");
const UserModel = require("../models/USER.js");
//=#=#=#=#=#==#=#=#=#=#==#=#=#=#=#==#=#=#=#=#==#=#=#=#=#==#=#=#=#=#=#

router.post("/login", Login);
//
router.post("/register", Register);
//

//
router.get("/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const User = await UserModel.findById(userId);

    if (!User) {
      return res.json({message: "user is not found", success: false});
    }

    const {username, email, imageUrl} = User;

    return res.json({
      success: true,
      message: "user is found successfully.",
      user: {username, email, imageUrl},
    });
  } catch (error) {
    return res.json({success: false, message: "error", error});
  }
});

router.delete("/remove/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const User = await UserModel.findByIdAndRemove(userId);
    return res.json({success: true});
  } catch (error) {
    return res.json({success: false});
  }
});

router.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.json({message: "User Is Not Exist", success: false});
    }

    const ExtractedDate = {
      username: user.username,
      email: user.email,
      posts: user.posts,
      image: user.imageUrl,
      createdOn: user.createdOn,
    };

    return res.json({
      user: ExtractedDate,
      message: "user found successfully.",
      success: false,
    });
  } catch (error) {
    return res.json({message: "failed", success: true});
  }
});

module.exports = router;
