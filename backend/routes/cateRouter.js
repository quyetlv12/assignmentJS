import { showListCate , addCategories ,categoryById,cateDetail,updateCategories,deleteCategories } from '../controller/cateController';
import express from 'express'
import {requireSignin, isAuth,isAdmin} from '../controller/authController'
import { userById } from '../controller/userController';


const CategoryRouter = express.Router();


CategoryRouter.get('/categories' ,showListCate);
CategoryRouter.post('/categories/:userById' ,requireSignin,isAuth,isAdmin,addCategories)
CategoryRouter.get('/categories/:categoryId' , cateDetail)
CategoryRouter.put('/categories/:categoryId/:userById' ,requireSignin,isAuth,isAdmin , updateCategories)
CategoryRouter.delete('/categories/:categoryId/:userById' ,requireSignin,isAuth,isAdmin , deleteCategories)
CategoryRouter.param('categoryId' , categoryById)
CategoryRouter.param('userById', userById)

module.exports = CategoryRouter;
