import { comparePassword, hashPassword } from "../helper/helper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
export const jwturl = "asdfghjkl";

export const rgisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name) {
      return res.send({ mesage: "name is required " });
    }
    if (!email) {
      return res.send({ mesage: "email is required" });
    }
    if (!password) {
      return res.send({ mesage: "password is required" });
    }

    // existing user
    const exisitinguser = await userModel.findOne({ email });
    if (exisitinguser) {
      return res.status(200).send(
        {
          sucess: false,
          mesage: "already register  user plz login",
        }

        // res.redirect("/login")
      );
    }
    // register user
    const hashedPassword = await hashPassword(password);
    const user1 = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();
    res.redirect("/login");
    res.status(201).send({
      sucess: true,
      message: "user register sucess fully",
      user1,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "error registration",
      error,
    });
  }
};
//login

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password ",
      });
    }
    //token
    const token = await jwt.sign({ _id: user._id }, jwturl, {
      expiresIn: "7d",
    });
    res.status(200).send(
      {
        success: true,
        message: "login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,

          role: user.role,
        },
        token,
      },
      res.redirect("/welcome")
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
