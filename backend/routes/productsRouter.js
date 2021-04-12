//start import fw express
import express from 'express';

//start lấy phương thức trong products controller
import {showList,addProducts,deleteProducts,productID,showDetailProduct,update , photo} from '../controller/productController'
import {requireSignin, isAdmin, isAuth,checkAdmin} from '../controller/authController'

//start gán phương thức Router trong express == router
 const router = express.Router();


 //start thiết lập các phương thức cho api 
 router.get('/products', showList)
 //start chi tiết sản phẩm
 router.get('/products/:productID' , showDetailProduct)
 //start thêm sản phẩm
 router.post('/products',requireSignin,checkAdmin, addProducts)
 //start xoá sản phẩm theo id
 router.delete('/products/:productID' ,requireSignin, checkAdmin, deleteProducts);
 //start sửa sản phẩm
router.put('/products/:productID',requireSignin, checkAdmin, update)
//start router image
router.get("/products/image/:productID" , photo)


 //lấy param
router.param('productID',productID)

 //start xuất router
 module.exports = router;