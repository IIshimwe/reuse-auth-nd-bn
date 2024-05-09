import { createuser } from "../controllers/user.controller.mjs";
import express from "express";
const router = express.Router();

router.post("/", createuser);

export default router;
