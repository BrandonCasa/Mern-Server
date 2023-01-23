import { User } from "../models/User.js";

// Read
export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { id } = req.body.user;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
