
import mongodb from '../config/API'
import Products from '../model/productModel';

//start kết nối tới mongodb
mongodb.connect();

//start tạo phương thức thêm sửa xoá hiển thị sản phẩm
export const addProducts = (req,res,next)=>{
  console.log("request",req.body);
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

//start show detail products
export const showDetailProduct = (req,res,next) =>{
    const id = req.params.id
    Products.findById(id , (err,product) =>{
        if(err){
            res.json({
                message : "error"
            })
        }
        else{
            res.json({product})
        }
    })
        
}
