import express from "express";
import {
  getAllUser,
  logingIn,
  signingUp,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signingUp);
router.post("/login", logingIn);
export default router;
