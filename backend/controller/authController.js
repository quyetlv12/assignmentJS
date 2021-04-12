import User from "../model/usersModel";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import dotenv from "dotenv";

dotenv.config();

//start đăng kí
export const signup = (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  user.save((err, db) => {
    if (err) {
      res.status(400).json({
        error: "signup error",
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json(db);
  });
};

//start đăng nhập
export const signin = (req, res) => {
  const {_email,_password} = req.query

  if (_email && _password) {
    // const { email, password } = req.body;
    User.findOne({ email : _email }, (error, user) => {
      if (error || !user) {
        return res.status(400).json({
          error: "User with that email does not exist. Please signup",
        });
      }
      if (!user.authenticate(_password)) {
        return res.status(401).json({
          error: "Email and password not match",
        });
      }
      const token = jwt.sign({_id :user._id,role :user.role} , process.env.JWT_SECRET);
      res.cookie("tokenAccess", token, { expire: new Date() + 9999 });
      const { _id, name, email, role } = user;
      return res.json([
        {token,id:_id,name  : name,email:email,role:role}
      ]);
    });
  }
  else{
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
      const token = jwt.sign({_id :user._id,role :user.role} , process.env.JWT_SECRET);
      res.cookie("tokenAccess", token, { expire: new Date() + 9999 });
      const { _id, name, email, role } = user;
      return res.json({
        token,
        user: { _id, email, name, role },
      });
    });
  }



};

//start đăng xuất
export const signout = (req, res, next) => {
  res.clearCookie("tokenAccess");
  res.json({
    err: "sign out ok",
  });
};

//start kiểm tra đăng nhập

export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

//start kiểm tra có phải là người dùng của trang web

export const isAuth = (req, res, next) => {
  //start kiểm tra _id ở payload token có trùng với _id trong req.profile
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  console.log(req.auth);
  if (!user) {
    return res.status(403).json({
      error: "not access",
    });
  }
  next();
};

//start kiểm tra có phải là admin (role == 0)
export const isAdmin = (req, res, next) => {
  console.log(req.profile.role);
  if (req.profile.role != 0) {
    return res.status(403).json({
      error: "you are not admin , please back to homepage",
    });
  }
  next();
};


//kiểm tra có phải là admin trong router products
export const checkAdmin = (req,res,next) =>{
  console.log(req.auth.role);
  if (req.auth.role != 0) {
    return res.status(403).json({
      error: "you are not admin , please back to homepage",
    });
  }
  next();
}
