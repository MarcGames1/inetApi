
import express from "express";

const router = express.Router();

// controllers
const {
  signup,
  signin,
  signout,
  forgotPassword,
  resetPassword,
  isAuth,
  isAdmin,
  requireSignin,
  currentUser,
} = require("../controllers/auth");


router.post("/signup", signup);
router.post("/signin", signin);
router.get('/signout', signout)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get('/current-admin',requireSignin, isAuth, isAdmin, currentUser)
export default router;
