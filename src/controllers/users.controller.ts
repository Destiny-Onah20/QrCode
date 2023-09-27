import { RequestHandler } from "express";
import Users from "../models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import userSchemaValidation from "../schemas/users.schema";

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    await userSchemaValidation.validateAsync({ name, email, password });

    const checkEmail = await Users.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        message: "Email already taken!"
      })
    };

    const saltPass = await bcryptjs.genSalt(10);
    await bcryptjs.hash(password, saltPass, async (err, result) => {
      if (err) {
        return res.status(400).json({
          message: err.message
        })
      } else {
        interface UserInterface {
          name: string;
          email: string;
          password: string
        };
        const userData: UserInterface = {
          name,
          email,
          password: result
        };

        const newUser = new Users(userData);
        const generateToken = jwt.sign({
          _id: newUser._id,
          name: newUser.name
        }, <string>process.env.SALT_SECT, {
          expiresIn: "1d"
        });

        newUser.token = generateToken;
        await newUser.save();

        return res.status(201).json({
          message: "Success!",
          data: generateToken
        });
      }
    });

  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: 'Failed!'
    })
  }
};

export const getOneUser: RequestHandler = async (req, res) => {
  try {
    const query = req.query;
    const theUser = await Users.find(query);

    res.status(200).json({
      message: "Success",
      data: theUser
    })

  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: 'Failed!'
    })
  }
}