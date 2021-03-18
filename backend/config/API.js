const mongoose = require('mongoose'); 


//start tạo ra hàm connect
const connect = () =>
    mongoose.connect("mongodb://localhost:27017/quyet_buy",
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
