const mongoose = require('mongoose');

//start lấy schema của mongoose
const Schema = mongoose.Schema;

//start định dạng kiểu dữ liệu cho object
const Products = new Schema({
    id : Number,
    name : String ,
    image : String ,
    price : String,
    brand : String,
    date: { type: Date, default: Date.now },
})
module.exports = mongoose.model("Products",Products);