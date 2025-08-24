import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// static signup method
userSchema.statics.signup = async function (email, password) {
  // checking if email exists
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("This email has already been registered!");
  }

  // password hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create the user
  const user = await this.create({ email, password: hash });

  return user;
};

export default mongoose.model("User", userSchema);
