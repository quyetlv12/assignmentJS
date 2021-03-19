const mongoose = require('mongoose'); 
const MONGO_URL = "mongodb://localhost:27017/quyet_buy"

//start tạo ra hàm connect
const connect = () =>
    mongoose.connect(MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
    
    .then((data) =>
    console.log({ connect: "kết nối thành công đến database !"})
  )
  .catch((err) => console.log("error"));

module.exports = { connect };
