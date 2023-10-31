import express from "express";
const router = express.Router();
import {
  register,
  authenticate,
  confirm,
  forgotPassword,
  checkToken,
  newPassword,
  profile,
} from "../controllers/userController.js";

import checkAuth from "../middleware/checkAuth.js";

// Authentication, Registration and Confirmation of User
router.post("/", register); // Create new user
router.post("/login", authenticate);
router.get("/confirm/:token", confirm);
router.post("/forgot-password", forgotPassword);
router.route("/forgot-password/:token").get(checkToken).post(newPassword);
router.get("/profile", checkAuth, profile);

export default router;
