import mongoose from "mongoose";
import crypto from 'crypto' // mã hoá mặt khẩu
import {v1 as uuidv1} from 'uuid' // để limited 
const Schema = mongoose.Schema;
const User = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
  },
  email: {
      type: String,
      trim: true,
      required: true,
      unique: 32
  },
  image : {
      type : String,
  },
  hashed_password: {
      type: String,
      required: true,
  },
  about: {
      type: String,
      trim: true,
  },
  salt: {
      type: String
  },
  description : {
      type : String
  },
//   password : {
//       type : String,
//       required : true
//   },
  role: {
      type: Number,
      default: 0
  },
  history: {
      type: Array,
      default: []
  },

}, { timeStamps: true })


User.virtual('password')
    .set(function (password) {
        console.log(password)
        this._password = password
        this.salt = uuidv1()
        this.hashed_password = this.encrytPassword(password)
    })
    .get(function () {
        return this._password
    })

User.methods = {
    authenticate: function (plainText) {
        console.log(plainText);
        return this.encrytPassword(plainText) === this.hashed_password;
    },
    encrytPassword: function (password) {
        if (!password) return '';
        try {
            const hashedPassword =  crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
                console.log(hashedPassword)
            return hashedPassword    
        } catch (error) {
            return "";
        }
    }
}


module.exports = mongoose.model("User", User);
