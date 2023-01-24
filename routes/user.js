import express from "express";
import { getUser } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";
import { User } from "../models/User.js";
import passport from "passport";

const router = express.Router();

// Read
router.get("/profile/:userId", verifyToken, getUser);

// Update
// router.patch("/friend/add/:friendId", verifyToken, addFriend);
// router.patch("/friend/remove/:friendId", verifyToken, removeFriend);


export default router;