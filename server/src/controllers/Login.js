const UserModel = require("../models/USER.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Login = async (req, res) => {
  const {username, password, email} = req.body;
  try {
    // If username is Exist => ? True : false

    const User = await UserModel.findOne({email});

    if (!User) {
      return res.json({success: false, message: "This Email Is not in use."});
    }

    const isValidPassword = await bcrypt.compare(password, User.password);

    if (!isValidPassword) {
      return res.json({
        success: false,
        message: "This Email or the password is Incorrect.",
      });
    }

    const Token = jwt.sign({token: User.id}, process.env.SECERT_KEY);
    return res.json({
      Token,
      userId: User._id,
      success: true,
      message: "You've Logged in Successfully.",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `${error} something wrong with Login.`,
    });
  }
};

module.exports = Login;
