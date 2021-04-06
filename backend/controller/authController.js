import User from "../model/usersModel";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";

export const signup = (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  user.save((err, db) => {
    if (err) {
      res.status(400).json({
        error: "signup error",
      });
    }
    user.salt = undefined
    user.hashed_password = undefined
    res.json(db);
  });
};

export const signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password not match",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, name, email, role } = user;
    return res.json({
      token,
      user: { _id, email, name, role },
    });
  });
};

export const signout = (req, res, next) => {
    res.clearCookie('t')
    res.json({
      err : "sign out ok"
    })
};
