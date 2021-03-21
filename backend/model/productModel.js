const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
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
Products.plugin(mongoosePaginate)
const productModel = mongoose.model("Products",Products);

module.exports = productModel;