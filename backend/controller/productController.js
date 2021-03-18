
import mongodb from '../config/API'
import Products from '../model/productModel';

//start kết nối tới mongodb
mongodb.connect();

//start tạo phương thức thêm sửa xoá hiển thị sản phẩm


//start add
export const addProducts = (req,res,next)=>{
    const data = req.body
   Products.create(data , (err,db) =>{
        if(err) throw err
        else console.log("thêm thành công", db.name) 
        res.json({message :"thêm thành công"})
    })
   
}

//start edit
export const editProducts = (req,res,next)=>{
    res.json({
        name : "sửa sản phẩm",
    })
}

//start delete
export const deleteProducts = async (req,res,next)=>{
    const id = req.params.id
    try {
        const result = await Products.findByIdAndDelete(id);
        res.send(result)
    } catch (error) {
        console.log(error.message);
    }
    
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
                message : "sản phẩm không tồn tại"
            })
        }
        else{
            res.json(product == null ?"sản phẩm không tồn tại" : {product})
        }
    })
        
}
