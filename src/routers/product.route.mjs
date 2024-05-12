import express from "express";
const route = express.Router();
import {
  createProduct,
  getAllProducts,
  getProduct,
} from "../controllers/product.controller.mjs";

route.post("/", createProduct);
route.get("/", getAllProducts);
route.get("/:id", getProduct);

export default route;
