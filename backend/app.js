//start import
import express from "express";
import productRouter from "./routes/productsRouter";
import userRouter from "./routes/userRouter";
import morgan from "morgan";
import dotenv from "dotenv";
import CategoryRouter from './routes/cateRouter';

//start gán express == app
const app = express();

//start yêu cầu hình env trong file app
dotenv.config();

//start sử dụng morgan làm midDleware cho app
app.use(morgan("dev"));

//start thiết lập môi trường cho cổng AIP

const port = process.env.PORT || 8000;

// start sử dụng router từ file routes
app.use("/api", productRouter);
app.use("/api", userRouter);
app.use("/api", CategoryRouter);

// start lắng nghe cổng 4000 
app.listen(port, () => {
  console.log("kết nối thành công tới : " + port);
});
