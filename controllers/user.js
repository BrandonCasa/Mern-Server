import { User } from "../models/User.js";
import mongoose from "mongoose";

const privateFieldsArr = ["username", "email", "friendRequestsIn", "friendRequestsOut", "servers", "activitySessions", "statusSessions", "password", "__v", "updatedAt"];
const privateFieldsString = ("=" + privateFieldsArr.join(" ")).replace(/ /g, " -").replace("=", "-");

// Get a user by ID
export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ message: "User not found" });
    }
    let user = await User.findById(userId).select(privateFieldsString);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Set a user's displayname
export const setDisplayName = async (req, res) => {
  try {
    const { _id } = req.user;
    const newUser = await User.findByIdAndUpdate(_id, { displayname: req.body.newname }, { new: true })
    return res.status(200).json({ message: "Display name changed.", user: newUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Set a user's about me
export const setAboutMe = async (req, res) => {
  try {
    const { _id } = req.user;
    const newUser = await User.findByIdAndUpdate(_id, { aboutMe: req.body.newaboutme }, { new: true })
    return res.status(200).json({ message: "Display name changed.", user: newUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Set a user's interests
export const setInterests = async (req, res) => {
  try {
    const { _id } = req.user;
    const newUser = await User.findByIdAndUpdate(_id, { interests: req.body.newinterests }, { new: true })
    return res.status(200).json({ message: "Display name changed.", user: newUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Add a friend
export const addFriend = async (req, res) => {
  try {
    const { _id } = req.user;
    const { friendId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(friendId)) {
      return res.status(404).json({ message: "User not found" });
    }
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await User.findById(_id);
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "You are already friends with this user" });
    }
    if (user.friendRequestsOut.includes(friendId)) {
      return res.status(400).json({ message: "You have already sent a friend request to this user" });
    }
    if (friend.friendRequestsIn.includes(_id)) {
      return res.status(400).json({ message: "This user has already sent you a friend request" });
    }
    await User.findByIdAndUpdate(_id, { friendRequestsOut: [...user.friendRequestsOut, friendId] })
    await User.findByIdAndUpdate(friendId, { friendRequestsIn: [...friend.friendRequestsIn, _id.toString()] })
    return res.status(200).json({ message: "Friend request sent" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}