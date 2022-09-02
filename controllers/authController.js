import { StatusCodes } from "http-status-codes";

import User from "../database/User.js";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

//controller for handling user registration, login, and user updates

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }

  const user = await User.create({ firstName, lastName, email, password });
  const token = user.createJWT(); //custom User schema method for generating JWT

  res.status(StatusCodes.CREATED).json({
    user: {
      //have to manually set these values to avoid returning password to front-end
      //the select: false option in User schema does not work here since user is created by create method
      //only works on Mongoose save functions (see login and updateUser below)
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email }).select("+password"); //bc we set password key in UserSchema with "select:false"
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password); //custom User schema method for comparing passwords
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({
    user,
    token,
  });
};

const updateUser = async (req, res) => {
  const { email, firstName, lastName } = req.body;
  if (!email || !firstName || !lastName) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });
  //could also use findOneAndUpdate function, but Mongoose docs recommend
  //using save method to update documents
  user.email = email;
  user.firstName = firstName;
  user.lastName = lastName;
  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token });
};

export { register, login, updateUser };
