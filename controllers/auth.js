
import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
import  expressjwt  from 'express-jwt' 
import {makeid} from '../helpers/randomString'
require('dotenv').config();


// sendgrid

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API);

export const signup = async (req, res) => {
  console.log("HIT SIGNUP", req.body);
  
  try {
    // validation
    const { nume,prenume, email, password } = req.body;
    if (!nume || !prenume) {
      return res.json({
        error: "Name is required",
      });
    }
    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken",
      });
    }
    // hash password
    const hashedPassword = await hashPassword(password);

    try {
      const user = await new User({
        nume,
        prenume,
        email,
        password: hashedPassword,
      }).save();

      // create signed token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      //   console.log(user);
      const { password, ...rest } = user._doc;
      return res.json({
        token,
        user: rest,
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

export const signin = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }
    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //persist the token as "t" in cookie with expiration time

    res.cookie("t", token, { expire: new Date() + 9999 })

    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (err) {
   
    return res.status(400).send("Error. Try again.");
  }
};

export const signout = (req, res) => {
  res.clearCookie('t')
  res.json({ message: "Signout Successfully" })
}

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
 
  // find user by email
  const user = await User.findOne({ email });
 
  if (!user) {
    return res.json({ error: "User not found" });
  }
  // generate code
  
  // save to db
  user.resetCode = makeid(5).toUpperCase();;
  user.save();
  
  // prepare email
  const emailData = {
    from: process.env.SENDGRID_SENDER,
    to: user.email,
    subject: "Resetare Parola Coramarc.ro",
    html: `<h1>Codul pentru resetarea parolei este: ${user.resetCode}</h1>`
  };
  // send email
  try {
    const data = await sgMail.send(emailData);
    console.log(data);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.json({ ok: false });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password, resetCode } = req.body;
    // find user based on email and resetCode
    const user = await User.findOne({ email, resetCode });
    // if user not found
    if (!user) {
      return res.json({ error: "Email or reset code is invalid" });
    }
    // if password is short
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    // hash password
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.resetCode = "";
    user.save();
    return res.json({ ok: true });
  } catch (err) {
    
  }
};


export const isAuth = async (req, res, next) => {

  try{
     const user = await User.findById(req.user._id);
     if(!user) {
      return res.status(404).json({error: "User Not Found!"})
     }
     else{
      next()
     }
  } catch (err) {
   
    return res.status(500).json({ error: err})
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 'Admin') {
      return res.status(403).send('Unauhorized');
    } else {
      next();
    }
  } catch (err) {
    
  }
};

export const requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  // userProperty: "auth",
  algorithms: ["HS256"],
})


export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ ok: true });
  } catch (err) {
   
  }
};