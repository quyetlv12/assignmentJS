import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const User = new Schema({
    id : Number,
    username : String,
    image : String,
    password : String ,

})

module.exports = mongoose.model("User",User);