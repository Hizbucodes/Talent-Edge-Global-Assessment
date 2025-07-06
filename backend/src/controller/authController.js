import { generateToken } from "../../utils/auth.js";
import User from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { username, password, confirmPassword, role } = req.body;

    if (!username || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with this username already exists." });
    }

    const newUser = await User.create({
      username,
      password,
      role: role || "student",
    });

    res.status(201).json({
      status: "success",
      message: `User registered with username ${username}`,
      user: {
        _id: newUser._id,
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields." });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const token = generateToken({
      id: user._id,
      role: user.role,
    });

    res.status(200).json({
      status: "success",
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
  }
};
