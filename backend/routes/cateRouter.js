import { showListCate , addCategories ,categoryById,cateDetail,updateCategories,deleteCategories } from '../controller/cateController';
import express from 'express'

const CategoryRouter = express.Router();


CategoryRouter.get('/categories' , showListCate);
CategoryRouter.post('/categories' , addCategories)
CategoryRouter.get('/categories/:categoryId' , cateDetail)
CategoryRouter.put('/categories/:categoryId' , updateCategories)
CategoryRouter.delete('/categories/:categoryId' , deleteCategories)


CategoryRouter.param('categoryId' , categoryById)

module.exports = CategoryRouter;
