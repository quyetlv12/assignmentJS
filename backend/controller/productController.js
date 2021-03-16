
import mongodb from '../config/API'
import Products from '../model/product';
mongodb.connect();
export const addProducts = (req,res,next)=>{
   res.json({
       name:"thêm sản phẩm",
   })
}
export const editProducts = (req,res,next)=>{
    res.json({
        name : "sửa sản phẩm",
    })
}
export const deleteProducts = (req,res,next)=>{
    res.json({
        name : "xoá sản phẩm ở đây",
    })
}
export const showList = (req,res,next)=>{
    Products.find({})
    .then(products => {
      products = products.map(products => products.toObject())
      res.json({products})
    }
    )
    .catch(next)
}
