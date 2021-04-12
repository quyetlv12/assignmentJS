//start import model user
import User from "../model/usersModel";
import formidable from "formidable";
//đọc file buffer
import fs from "fs";

//start get param id

export const userById = (req, res, next, id) => {
  User.findById(id).exec((error, data) => {
    if (error || !data) {
      return res.status(400).json({
        error: "khong tim thay user",
      });
    }
    req.profile = data;
    next();
  });
};

//start add user

export const addUser = (req, res, next) => {
  // let form = new formidable.IncomingForm();
  // form.keepExtensions = true;
  // form.parse(req, (err, fields, files) => {
  //   if (err) {
  //     return res.status(400).json({
  //       message: "Thêm sản phẩm không thành công",
  //     });
  //   }
  //   const { username, password } = fields;
  //   if (!username || !password) {
  //     res.status(400).json({
  //       error: "vui lòng nhập đủ trường",
  //     });
  //   }
  //   console.log(fields);
  //   console.log(files);
  //   let user = new User(fields);
  //   const sizeImage = (form.maxFieldsSize = 1 * 1024 * 1024);
  //   if (files.image) {
  //     if (files.image.size > sizeImage) {
  //       res.status(400).json({
  //         error: "kích thước file vượt quá 1 MB ",
  //       });
  //     }
  //     user.image.data = fs.readFileSync(files.image.path);
  //     user.image.contentType = files.image.path;
  //   }
  //   user.save((err, db) => {
  //     if (err) {
  //       res.status.json({
  //         error: "lỗi",
  //       });
  //     } else {
  //       res.json({
  //         message: "Thêm sản phẩm thành công",
  //       });
  //     }
  //   });
  // });
  let user = new User(req.body)
  user.save((err,user)=>{
    if(err || !user){
      return res.status(400).json({
        error : " thêm tài khoản thất bại"
      })
    }
    res.status(200).json(user)
  })
};

//end add user


//start delete user

export const deleteUser = (req, res, next) => {
  let user = req.profile
  user.remove((err,user)=>{
    if (err) {
      res.status(400).json({
        err : "không xoá được người dùng"
      })
    }
    res.status(200).json(user)
  })
};

//end delete user

//start edit user
export const editUser = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.profile.id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          err : "can not update user"
        })
      }
      req.profile.hashed_password
      req.profile.slat
      res.json(user)
    }
  );
};
//end edit user

//start show list user
export const showListUser = async (req, res, next) => {
  //check hash username in mongo
  if (req.query.username) {
    //
    User.find({ username: req.query.username }, function (err, obj) {
      if (err) {
        console.log(err);
      } else {
        res.json(obj);
      }
    });
  }
  //nếu không truyền vào params thì trả về tất cả sản phẩm
  else {
    User.find({})
      .then((user) => {
        user = user.map((user) => user.toObject());
        res.json(user);
      })
      .catch(next);
  }
};

//end show list user

export const detailUser = (req, res, next) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};
