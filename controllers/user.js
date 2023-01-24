import { User } from "../models/User.js";
import mongoose from "mongoose";

const privateFieldsArr = ["username", "email", "friendRequestsIn", "friendRequestsOut", "servers", "activitySessions", "statusSessions", "password", "__v", "updatedAt"];
const privateFieldsString = ("=" + privateFieldsArr.join(" ")).replace(/ /g, " -").replace("=", "-");

// Read
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
