import { showListNews,newsDetail,addNews,deleteNews,editNews,newById} from '../controller/newsController';
import {requireSignin, isAuth,isAdmin} from '../controller/authController'

import express from 'express'
import { userById } from '../controller/userController';
const NewsRouter = express.Router();
NewsRouter.get('/news' , showListNews);
NewsRouter.get('/news/:newsId' , newsDetail);
NewsRouter.post('/news/:UserId',requireSignin,isAuth,isAdmin,addNews)
NewsRouter.put('/news/:newsId/:UserId',requireSignin,isAuth,isAdmin,editNews)
NewsRouter.delete('/news/:newsId/:UserId',requireSignin,isAuth,isAdmin,deleteNews)
NewsRouter.param('newsId' , newById)
NewsRouter.param('UserId', userById)

module.exports = NewsRouter;
