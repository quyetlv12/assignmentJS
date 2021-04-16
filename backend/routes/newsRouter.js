import { showListNews,newsDetail,addNews,deleteNews,editNews,newById} from '../controller/newsController';
import {requireSignin, isAuth,isAdmin} from '../controller/authController'

import express from 'express'
const NewsRouter = express.Router();
NewsRouter.get('/news' , showListNews);
NewsRouter.get('/news/:newsId' , newsDetail);
NewsRouter.post('/news',requireSignin,isAuth,isAdmin,addNews)
NewsRouter.put('/news/:newsId',requireSignin,isAuth,isAdmin,editNews)
NewsRouter.delete('/news/:newsId',requireSignin,isAuth,isAdmin,deleteNews)
NewsRouter.param('newsId' , newById)

module.exports = NewsRouter;
