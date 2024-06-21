import mongoose from "mongoose";
// import { string } from "zod";

export const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

export const User = mongoose.model("user", userSchema);
