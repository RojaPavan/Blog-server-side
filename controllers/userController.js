import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No user exist" });
  }
  return res.status(200).json({ users });
};

export const signingUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  let currentUser;
  try {
    currentUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (currentUser) {
    return res
      .status(400)
      .json({ message: "User Already Exists! Try Loging In" });
  }
  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });
  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user });
};

export const logingIn = async (req, res, next) => {
  const { email, password } = req.body;
  let currentUser;
  try {
    currentUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!currentUser) {
    return res.status(404).json({ message: "User Not Exists With this Email" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, currentUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Password is not correct" });
  }
  return res
    .status(200)
    .json({ message: "Logged In Successfully", user: currentUser });
};
