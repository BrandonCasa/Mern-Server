import express from "express";
import { addFriend, getUser, setAboutMe, setDisplayName, setInterests } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";
import { User } from "../models/User.js";
import passport from "passport";

const router = express.Router();

// Read
router.get("/profile/:userId", getUser);

// Update
router.get("/me/changename", verifyToken, setDisplayName);
router.get("/me/changeaboutme", verifyToken, setAboutMe);
router.get("/me/changeinterests", verifyToken, setInterests);
router.post("/friend/add/:friendId", verifyToken, addFriend);
// router.patch("/friend/remove/:friendId", verifyToken, removeFriend);


export default router;