import { Schema, model } from "mongoose";

const Product = model(
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

export default Product;
