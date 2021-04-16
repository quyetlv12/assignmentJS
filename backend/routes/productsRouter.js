//start import fw express
import express, { Router } from 'express';

//start lấy phương thức trong products controller
import {showList,addProducts,deleteProducts,productID,showDetailProduct,update , photo} from '../controller/productController'
import {requireSignin, isAdmin, isAuth} from '../controller/authController'
import {userById} from '../controller/userController'

//start gán phương thức Router trong express == router
 const router = express.Router();


 //start thiết lập các phương thức cho api 
 router.get('/products', showList)
 //start chi tiết sản phẩm
 router.get('/products/:productID' , showDetailProduct)
 //start thêm sản phẩm
 router.post('/products/:userById',requireSignin,isAuth,isAdmin, addProducts)
 //start xoá sản phẩm theo id
 router.delete('/products/:productID/:userById' ,requireSignin,isAuth ,isAdmin ,deleteProducts);
 //start sửa sản phẩm
router.put('/products/:productID/:userById',requireSignin,isAuth,isAdmin, update)
//start router image
router.get("/products/image/:productID" , photo)


//lấy param user
router.param('userById', userById)


 //lấy param product
router.param('productID',productID)

 //start xuất router
 module.exports = router;