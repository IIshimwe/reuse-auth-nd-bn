import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
  firstName: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: true,
  },
  profile_image: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY
  );
};

export default model("User", userSchema);
