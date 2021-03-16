import express from 'express';
import {showList,addProducts} from '../controller/productController'
 const router = express.Router();
 router.get('/products', showList)
 router.post('/products', addProducts) 
 module.exports = router;