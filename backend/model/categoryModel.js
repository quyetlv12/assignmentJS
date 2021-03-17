import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const Categories = new Schema({
    id : Number, 
    name : String,
})

module.exports = mongoose.model("Categories",Categories);