import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const News = new Schema({
    title : {
        type : String,
        require : true
    }
})

module.exports = mongoose.model("News",News);