import express from "express";
const router = express.Router();
import { authUser } from "../controllers/auth.mjs";

router.post("/", authUser);

export default router;
