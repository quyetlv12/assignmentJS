import { showListNews,newsDetail} from '../controller/newsController';
import express from 'express'
const NewsRouter = express.Router();
NewsRouter.get('/news' , showListNews);
NewsRouter.get('/news/:id' , newsDetail);
module.exports = NewsRouter;
