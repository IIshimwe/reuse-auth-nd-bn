import { createuser, getUsers } from "../controllers/user.controller.mjs";
import express from "express";
const router = express.Router();

router.post("/", createuser);
router.get("/", getUsers);
export default router;
