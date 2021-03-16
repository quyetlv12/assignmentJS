import express from "express";
import productRouter from "./routes/products";
import userRouter from "./routes/userRouter";
import morgan from "morgan";
import dotenv from "dotenv";
const app = express();
dotenv.config();
app.use(morgan("dev"));

//start thiết lập môi trường cho cổng AIP
const port = process.env.PORT || 8000;

// start sử dụng router từ file routes
app.use("/api", productRouter);
app.use("/api", userRouter);

// start lắng nghe cổng 4000 
app.listen(port, () => {
  console.log("kết nối thành công tới : " + port);
});
