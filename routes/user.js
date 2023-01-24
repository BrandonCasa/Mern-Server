import express from "express";
import { getUser } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";
import { User } from "../models/User.js";
import passport from "passport";
import LocalStrategy from "passport-local";

const router = express.Router();

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Read
router.get("/profile/:userId", getUser);

// Update
// router.patch("/friend/add/:friendId", verifyToken, addFriend);
// router.patch("/friend/remove/:friendId", verifyToken, removeFriend);


export default router;