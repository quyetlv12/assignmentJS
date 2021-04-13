import { showListCate , addCategories ,categoryById,cateDetail,updateCategories,deleteCategories } from '../controller/cateController';
import express from 'express'
import {requireSignin, checkAdmin} from '../controller/authController'


const CategoryRouter = express.Router();


CategoryRouter.get('/categories' ,showListCate);
CategoryRouter.post('/categories' ,requireSignin,checkAdmin,addCategories)
CategoryRouter.get('/categories/:categoryId' , cateDetail)
CategoryRouter.put('/categories/:categoryId' ,requireSignin,checkAdmin , updateCategories)
CategoryRouter.delete('/categories/:categoryId' ,requireSignin,checkAdmin , deleteCategories)


CategoryRouter.param('categoryId' , categoryById)

module.exports = CategoryRouter;
