import mongoose from "mongoose";
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", User);
