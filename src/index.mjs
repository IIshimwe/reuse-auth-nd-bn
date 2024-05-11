import express from "express";
const app = express();
import "dotenv/config";
import mongoose from "../config/db.mjs";
import user from "./routers/user.router.mjs";
import auth from "./routers/auth.route.mjs";
import product from "./routers/product.route.mjs";

app.use(express.json());
app.use("/api/v1/users", user);
app.use("/api/v1/auth", auth);
app.use("/api/v1/products", product);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
