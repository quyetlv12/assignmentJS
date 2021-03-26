//start import fw express
import express from 'express';

//start lấy phương thức trong products controller
import {showList,addProducts,deleteProducts,productID,showDetailProduct,update} from '../controller/productController'

//start gán phương thức Router trong express == router
 const router = express.Router();


 //start thiết lập các phương thức cho api 
 router.get('/products', showList)
 //start chi tiết sản phẩm
 router.get('/products/:productID' , showDetailProduct)
 //start thêm sản phẩm
 router.post('/products', addProducts)
 //start xoá sản phẩm theo id
 router.delete('/products/:productID' , deleteProducts);
 //start sửa sản phẩm
router.put('/products/:productID', update)


 //lấy param
router.param('productID',productID)

 //start xuất router
 module.exports = router;