import JWT from "jsonwebtoken";
import { jwturl } from "../controller/registerController.js";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, jwturl);
    req.user = decode;
    next();
  } catch (error) {
    res.redirect("/login");
  }
};
//admin acceess
