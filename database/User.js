import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//setup Mongoose schema for Users database
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
    minlength: 2,
    maxlength: 20,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name"],
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    select: false,
  },
});

//method to hash and salt passwords with bcrypt using Mongoose pre-hook on document saves
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  //above added for updateUser functionality to avoid "invalid string undefined" error
  //due to to select:false on password property in above Schema, also to avoid rehashing a hashed pwd
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); //'this' points back to instance of User model (document)
});

//method to create JSON Web Token
UserSchema.methods.createJWT = function () {
  const payload = { userId: this._id };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

//method to compare passwords on login
UserSchema.methods.comparePassword = async function (suppliedPassword) {
  const isMatch = await bcrypt.compare(suppliedPassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
