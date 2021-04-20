import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const Contact = new Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
    },
    numberphone : {
        type : Number
    },
    message : {
        type : String
    }
})

module.exports = mongoose.model("Contact",Contact);