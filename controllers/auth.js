import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

// Register a new user
export const register = async (req, res) => {
  try {
    const { displayname, username, email, password, interests } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      displayname,
      username,
      email,
      password: hashedPassword,
      interests
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Logging in a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    !user && res.status(400).json({ msg: "User not found" });

    const validated = await bcrypt.compare(password, user.password);
    !validated && res.status(400).json({ msg: "Wrong password" });

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ accessToken, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};