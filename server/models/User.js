import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  username: {
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
  points: {
    mathPoints: {
      type: Number,
      default: 0,
    },
    typingPoints: {
      type: Number,
      default: 0,
    },
    spellingPoints: {
      type: Number,
      default: 0,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// static login method

userSchema.statics.login = async function (email, password) {
  //validating email and password
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("This email is not registered!");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password!");
  }

  return user;
};

// static signup method
userSchema.statics.signup = async function (email, username, password) {
  //validating fields
  if (!email || !username || !password) {
    throw Error("All fields must be filled!");
  }

  if (!validator.isEmail(email)) {
    throw Error("This is not a valid email!");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough!");
  }

  // checking if email exists in the database
  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error("This email has already been registered!");
  }

  // check if username exists in the database
  const usernameExists = await this.findOne({ username });

  if (usernameExists) {
    throw Error(`The username ${username} has been taken!`);
  }

  // password hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create the user
  const user = await this.create({ email, username, password: hash });

  return user;
};

export default mongoose.model("User", userSchema);
