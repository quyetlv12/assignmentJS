import { showListCate , addCategories ,categoryById,cateDetail,updateCategories,deleteCategories } from '../controller/cateController';
import express from 'express'
import {requireSignin, isAuth,isAdmin} from '../controller/authController'


const CategoryRouter = express.Router();


CategoryRouter.get('/categories' ,showListCate);
CategoryRouter.post('/categories' ,requireSignin,isAuth,isAdmin,addCategories)
CategoryRouter.get('/categories/:categoryId' , cateDetail)
CategoryRouter.put('/categories/:categoryId' ,requireSignin,isAuth,isAdmin , updateCategories)
CategoryRouter.delete('/categories/:categoryId' ,requireSignin,isAuth,isAdmin , deleteCategories)


CategoryRouter.param('categoryId' , categoryById)

module.exports = CategoryRouter;
