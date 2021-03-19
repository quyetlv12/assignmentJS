const mongoose = require('mongoose');

//start lấy schema của mongoose
const Schema = mongoose.Schema;

//start định dạng kiểu dữ liệu cho object
const Products = new Schema({
    name : {
        type : String,
        require : true
    } ,
    image : String ,
    price : {
        type :String,
        require : true
    },
    brand : String,
    date: { type: Date, default: Date.now },
})
module.exports = mongoose.model("Products",Products);