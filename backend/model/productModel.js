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
    image : {
        type : String ,
    },
    price : {
        type : Number,
        require : true
    },
    salePrice : {
        type : Number
    },
    status : {
        type : Boolean,
        require: true
    },
    cateID : {
        type : Number,
        default : 1
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
})
Products.plugin(mongoosePaginate)
const productModel = mongoose.model("Products",Products);

module.exports = productModel;