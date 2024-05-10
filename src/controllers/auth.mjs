import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../config/models/user.model.mjs";
import { validateAuth } from "../helpers/validations.mjs";
import _ from "lodash";

export const authUser = async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ message: "Email or Password is incorrect" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "Email or Password is incorrect" });

  const token = user.generateToken();
  res
    .header("x-auth-token", token)
    .status(200)
    .json(_.pick(user, ["_id", "email"]));
};
