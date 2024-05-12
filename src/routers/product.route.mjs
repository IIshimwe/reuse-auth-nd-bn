import express from "express";
const route = express.Router();
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/product.controller.mjs";

route.post("/", createProduct);
route.get("/", getAllProducts);
route.get("/:id", getProduct);
route.put("/:id", updateProduct);

export default route;
