import express from "express";
const route = express.Router();
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.mjs";

route.post("/", createProduct);
route.get("/", getAllProducts);
route.get("/:id", getProduct);
route.put("/:id", updateProduct);
route.delete("/:id", deleteProduct);

export default route;
