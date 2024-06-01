import User from "../../config/models/user.model.mjs";
import { validateUser } from "../helpers/validations.mjs";
import { hashPassword } from "../helpers/helper.mjs";
import _ from "lodash";
import { sendMail } from "../helpers/sendMail.mjs";
import cloudinary from "../helpers/cloudinary.mjs";

export const createuser = async (req, res) => {
  const { firstName, lastName, profile_image, email, password } = req.body;

  // Cloudinary
  const uploadResult = await cloudinary.uploader
    .upload(profile_image, {
      folder: "reuse/users",
      overwrite: true,
      invalidate: true,
      resource_type: "auto",
    })
    .catch((error) => {
      console.log(error.message);
    });

  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ error: "User already exists" });

    // user = new User(
    //   _.pick(req.body, ["firstName", "lastName", "email", "password"])
    // );
    user = await User.create({
      firstName,
      lastName,
      profile_image: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
      email,
      password,
    });
    user.password = await hashPassword(user.password);

    // Notify user that he/she has registered on the system

    const subject = "Successfully registered on auth reuse";
    const message = `
      Hello ${req.body.lastName} ${req.body.firstName},
      <br />
      <br />
      Thank you for signing up for Auth Reuse.
      You may login to your account using the following credentials:
      <br />
      <br />
      Email: ${req.body.email}
      <br />
      Password: ${req.body.password}
      on this link: <a href="https://www.youtube.com/watch?v=9eTNiZ3rAUg">Link</a>
      <br />
      <br />
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
