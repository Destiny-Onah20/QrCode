import mongoose from "mongoose";

import { Document, Schema } from "mongoose";

interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  token: string
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "This field is required! "]
  },
  email: {
    type: String,
    require: [true, "This field is required! "],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    require: [true, "This field is required! "]
  },
  token: {
    type: String
  }
}, {
  timestamps: true
});

const Users = mongoose.model<UserInterface>("users", userSchema);

export default Users;