
import mongodb from '../config/API'
import Products from '../model/productModel';

//start kết nối tới mongodb
mongodb.connect();

//start tạo phương thức thêm sửa xoá hiển thị sản phẩm
export const addProducts = (req,res,next)=>{
   res.json({
       name:"thêm sản phẩm",
   })
}

//start edit
export const editProducts = (req,res,next)=>{
    res.json({
        name : "sửa sản phẩm",
    })
}

//start delete
export const deleteProducts = (req,res,next)=>{
    res.json({
        name : "xoá sản phẩm ở đây",
    })
}

//start hiển thị danh sách 
export const showList = (req,res,next)=>{
    Products.find({})
    .then(products => {
      products = products.map(products => products.toObject())
      res.json({products})
    }
    )
    .catch(next)
}
