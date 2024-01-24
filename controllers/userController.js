const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = new User({
      email,
      password,
    });

    const savedUser = await user.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRES,
    });

    res.status(201).json({
      status: true,
      token,
      message: "User created successfully!!! 😎",
    });
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  const existUser = await User.findOne({ _id: req.decode.id });
  if (!existUser) {
    res.status(401).json({
      status: false,
      message: "You must register or login to perform operations",
    });
    return;
  }
  const foundUser = await User.findOne({ _id: req.params.id });
  if (!foundUser) {
    res.status(404).json({ status: false, message: "User doesn't exist!" });
    return;
  }
  res.status(200).json({ status: true, message: foundUser });
};


const userUpdate = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
  res.status(201).json({
    status: true,
    updatedUser,
  });
};

const protectUser = async function (req, res, next) {
  const authorization = req.headers.authorization;
  let token;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401).json({
      status: false,
      message: "Login or register to continue!",
    });
    return;
  }
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  req.decode = decode;
  next();
};

module.exports = { createUser, getUser, userUpdate, protectUser };
