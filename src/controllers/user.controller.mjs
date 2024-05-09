import User from "../../config/models/user.model.mjs";
import { validateUser } from "../helpers/validations.mjs";
import { hashPassword } from "../helpers/helper.mjs";
import _ from "lodash";

export const createuser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ error: "User already exists" });

  user = new User(
    _.pick(req.body, ["firstName", "lastName", "email", "password"])
  );
  user.password = await hashPassword(user.password);
  await user.save();

  res.json({
    message: "User created successfully",
    user: _.pick(user, ["firstName", "lastName", "email"]),
  });
};
