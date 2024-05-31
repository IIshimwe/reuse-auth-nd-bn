import { Schema, model } from "mongoose";

const Product = model(
  "Products",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    product_image: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
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
