import { showListNews,newsDetail,addNews,deleteNews,editNews,newById} from '../controller/newsController';
import {requireSignin, checkAdmin} from '../controller/authController'

import express from 'express'
const NewsRouter = express.Router();
NewsRouter.get('/news' , showListNews);
NewsRouter.get('/news/:newsId' , newsDetail);
NewsRouter.post('/news',requireSignin,checkAdmin,addNews)
NewsRouter.put('/news/:newsId',requireSignin,checkAdmin,editNews)
NewsRouter.delete('/news/:newsId',requireSignin,checkAdmin,deleteNews)
NewsRouter.param('newsId' , newById)

module.exports = NewsRouter;
