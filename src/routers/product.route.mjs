import express from "express";
const route = express.Router();
import {
  createProduct,
  getAllProducts,
} from "../controllers/product.controller.mjs";

route.post("/", createProduct);
route.get("/", getAllProducts);

export default route;
