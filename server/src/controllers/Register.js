const UserModel = require("../models/USER.js");
const bcrypt = require("bcrypt");

const isValidEmail = (email) => {
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const Register = async (req, res) => {
  const {password, username, email, image} = req.body;
  console.log(req.body);

  try {
    // Step 1 => Check if The username Is Already Exist

    // if (!isValidEmail(email)) {
    //   return res
    //     .status(401)
    //     .json({message: "Email Is Not Valid.", success: false});
    // }

    const User = await UserModel.findOne({email});

    if (User) {
      return res.json({
        success: false,
        message: "The email is already in use.",
      });
    }

    // if Not => Create hashed Password Then Publish everything to database

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      password: hashedPassword,
      email,
      imageUrl: image,
    });

    if (!newUser.imageUrl) {
      newUser.imageUrl =
        "https://media.istockphoto.com/id/1209654046/vector/user-avatar-profile-icon-black-vector-illustration.jpg?s=612x612&w=0&k=20&c=EOYXACjtZmZQ5IsZ0UUp1iNmZ9q2xl1BD1VvN6tZ2UI=";
    }

    await newUser.save();

    return res.json({
      success: true,
      message: "user created successfully.",
    });
  } catch (error) {
    return res.json({success: false, error});
  }
};

module.exports = Register;
