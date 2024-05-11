import { Schema, model } from "mongoose";

const Products = model(
  "Products",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  })
);

export default Products;
