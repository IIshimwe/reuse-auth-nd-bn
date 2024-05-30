import Product from "../../config/models/product.model.mjs";
import { validateProduct } from "../helpers/validations.mjs";
import _ from "lodash";

// CREATE A NEW PRODUCT
export const createProduct = async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  let product = await Product.findOne({ name: req.body.name });
  if (product)
    return res.status(400).json({
      message:
        "Product is already registered. Please register unexisting product",
    });

  product = new Product(
    _.pick(req.body, ["name", "product_image", "description", "price", "stock"])
  );

  await product.save();

  res.status(200).json({ data: product });
};

// GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  if (!products)
    return res.status(200).json({ message: "No products registered" });

  res.status(200).json({ data: products });
};

// GET A SINGLE PRODUCT
export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res
      .status(404)
      .json({ message: "The product you are looking for does not exists" });

  res.status(200).json({ data: product });
};

// UPDATING PRODUCT
export const updateProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product)
    return res.status(400).send("A genre you want to update does not exists");

  const { error } = validateProduct(req.body);
  if (error) return res.status(403).send(error.details[0].message);

  product.name = req.body.name;
  product.description = req.body.description;
  product.price = req.body.price;
  product.stock = req.body.stock;
  product.save();

  res
    .status(200)
    .send(
      _.pick(product, [
        "id",
        "name",
        "product_image",
        "description",
        "price",
        "stock",
      ])
    );
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ message: "The product you are looking for does not exists" });

    res.status(200).json({ data: product });
  } catch (error) {
    console.log(error);
  }
};
