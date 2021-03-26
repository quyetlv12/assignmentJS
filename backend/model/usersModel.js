import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema({
    username : {
        type : String,
        require : true
    },
    image : {
        data : Buffer,
        contentType : String
    },
    password :{
        type : String,
        require : true
    },
    email :{
        type : String,
        require : true
    }
})

module.exports = mongoose.model("User",User);