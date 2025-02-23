const UserRouter = require("express").Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const JWT_SECRET = process.env.JWT_SECRET;
UserRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, first_name, last_name, gender } = req.body;
    bcrypt.hash(password,3, async (err, hash) => {
      if (err) return res.status(500).json({ message: err.message });
      const newUser = new UserModel({
        email,
        password: hash,
        first_name,
        last_name,
        gender,
      });
      await newUser.save();
      return res.status(201).json({ message: "Registration success" });
    });
  } catch (error) {
    
    return res.status(500).json({ mesage: error.message });
  }
});

UserRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await UserModel.findOne({ email });
    if (!existUser)
      return res.status(404).json({ message: "Email is not registered." });
    bcrypt.compare(password, existUser.password, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: res
            .status(500)
            .json({ mesage: "Internal server error, please try again." }),
        });
      }
      if (!result)
        return res.status(401).json({ message: "Incorrect password" });
      const token = jwt.sign(
        { email: existUser.email, id: existUser._id },
        JWT_SECRET
      );
      return res.json({
        message: "Login success.",
        data: {
          token,
          id:existUser._id,
          email: existUser.email,
          first_name: existUser.first_name,
          last_name: existUser.last_name,
          gender: existUser.gender,
        },
      });
    });
  } catch (error) {
    res.status(500).json({ mesage: error.message });
  }
});

module.exports = UserRouter