import { auth } from "../middlewares/auth.mjs";
import { isAdmin } from "../middlewares/admin.mjs";
import express from "express";
const route = express.Router();
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.mjs";

route.post("/", auth, isAdmin, createProduct);
route.get("/", getAllProducts);
route.get("/:id", getProduct);
route.put("/:id", updateProduct);
route.delete("/:id", deleteProduct);

export default route;
