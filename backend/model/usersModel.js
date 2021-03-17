import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const User = new Schema({
    username : String,
    image : String,
    password : String ,
})

module.exports = mongoose.model("User",User);