import express from "express";
const app = express();
import "dotenv/config";
import mongoose from "../config/db.mjs";

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
