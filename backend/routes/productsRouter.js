import express from 'express';
//start lấy phương thức trong products controller
import {showList,addProducts,editProducts,deleteProducts} from '../controller/productController'

//start gán phương thức Router trong express == router
 const router = express.Router();

 //start thiết lập các phương thức cho api 
 router.get('/products', showList)
 router.post('/products', addProducts)
 router.delete('/products' , deleteProducts);
 router.put('/products' , editProducts);

 //start xuất router
 module.exports = router;