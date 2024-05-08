import { Schema, model } from "mongoose";

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

export default model("User", userSchema);
