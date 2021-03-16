const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Products = new Schema({
    id : Number,
    name : String ,
    image : String ,
    price : String,
    brand : String,
    date: { type: Date, default: Date.now },
})
module.exports = mongoose.model("Products",Products);