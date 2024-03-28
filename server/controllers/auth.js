import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/User.js";

// Register User
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new user({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    const savedUser = await newUser.save();

    //201 --> something got created
    res.status(201).json(savedUser);
  } catch (err) {
    console.log("Error in registration", err);
    // 500 --> Some error  happened on the server side
    res.status(500).json({ error:err.message });
  }
};
