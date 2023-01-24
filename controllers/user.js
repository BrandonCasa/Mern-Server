import { User } from "../models/User.js";

// Read
export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    let user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
