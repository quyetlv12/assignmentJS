import { showListCate } from '../controller/cateController';
import express from 'express'

const CategoryRouter = express.Router();


CategoryRouter.get('/categories' , showListCate);

module.exports = CategoryRouter;
