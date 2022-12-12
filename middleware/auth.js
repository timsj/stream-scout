import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

//authentication middleware to check for JWT in headers

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) throw new UnauthenticatedError("Authentication invalid");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export default auth;
