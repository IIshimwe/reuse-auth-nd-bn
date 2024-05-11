import Products from "../../config/models/products.model.mjs";
import { validateProduct } from "../helpers/validations.mjs";
import _ from "lodash";

export const createProduct = async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  let product = await Products.findOne({ name: req.body.name });
  if (product)
    return res.status(400).json({
      message:
        "Product is already registered. Please register unexisting product",
    });

  product = new Products(
    _.pick(req.body, ["name", "description", "price", "stock"])
  );

  await product.save();

  res.status(200).json({ message: product });
};
