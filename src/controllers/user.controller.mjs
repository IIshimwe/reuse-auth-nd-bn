import User from "../../config/models/user.model.mjs";
import { validateUser } from "../helpers/validations.mjs";
import { hashPassword } from "../helpers/helper.mjs";
import _ from "lodash";
import { sendMail } from "../helpers/sendMail.mjs";

export const createuser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ error: "User already exists" });

    user = new User(
      _.pick(req.body, ["firstName", "lastName", "email", "password"])
    );
    user.password = await hashPassword(user.password);

    // Notify user that he/she has registered on the system

    const subject = "Successfully registered on auth reuse";
    const message = `
      Hello ${req.body.lastName} ${req.body.firstName},
      <br />
      <br />
      Thank you for signing up for Auth Reuse.
      If you did not sign up on this platform, you can safely ignore this email.
      <br /><br />
      Best,
      <br /><br />
      Isaac ISHIMWE - SWE
    `;

    await sendMail(req.body.email, subject, message);

    await user.save();

    res.json({
      message: "User created successfully",
      user: _.pick(user, ["firstName", "lastName", "email"]),
    });
  } catch (error) {
    console.log("Error creating user account: ", error);
    return res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json({ users });
};
