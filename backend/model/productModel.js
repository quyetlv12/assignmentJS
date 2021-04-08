const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
//start lấy schema của mongoose
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema

//start định dạng kiểu dữ liệu cho object
const Products = new Schema({
    name : {
        type : String,
        // required : true
    } ,
    image : {
        // data: Buffer,
        // contentType: String
        type : String,
    },
    cateID : {
      type : ObjectId,
      ref : "Category",
    //   required : true  
    },
    price : {
        type : Number,
        // required : true
    },
    salePrice : {
        type : Number

    },
    status : {
        type : Boolean,
        
    },
    quantity : {
        type : Number,
        default : 1,
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
},{timeStamp : true})
Products.plugin(mongoosePaginate)
const productModel = mongoose.model("Products",Products);
module.exports = productModel;