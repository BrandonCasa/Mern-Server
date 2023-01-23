import express from "express";
import { getUser } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";
import { User } from "../models/User.js";
import passport from "passport";

const router = express.Router();

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
})

// Read
router.get("/profile/:userId", getUser);

// Update
// router.patch("/friend/add/:friendId", verifyToken, addFriend);
// router.patch("/friend/remove/:friendId", verifyToken, removeFriend);


export default router;