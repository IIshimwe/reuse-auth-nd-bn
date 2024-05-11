import express from "express";
const route = express.Router();
import { createProduct } from "../controllers/products.model.mjs";

route.post("/", createProduct);

export default route;
