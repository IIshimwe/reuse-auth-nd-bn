import { auth } from "../middlewares/auth.mjs";
import { createuser, getUsers } from "../controllers/user.controller.mjs";
import express from "express";
const router = express.Router();

router.post("/", createuser);
router.get("/", auth, getUsers);
export default router;
