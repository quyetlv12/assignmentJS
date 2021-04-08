import Products from "../model/productModel";
//lấy dữ liệu form
import formidable from "formidable";
//đọc file buffer
import fs from "fs";
//lodash
import _ from 'lodash';



//add products
export const addProducts = (req, res, next) => {
  const product = new Products(req.body)
  // let form = new formidable.IncomingForm();
  // form.keepExtensions = true;
  // form.parse(req, (err, fields, files) => {
  //   if (err) {
  //     return res.status(400).json({
  //       message: "Thêm sản phẩm không thành công",
  //     });
  //   }
  //   const { name, price } = fields;
  //   if (!name || !price) {
  //     res.status(400).json({
  //       error: "vui lòng nhập đủ trường",
  //     });
  //   }
  //   console.log(fields);
  //   console.log(files);
  //   let product = new Products(fields);
  //   // const sizeImage = (form.maxFieldsSize = 2 * 1024 * 1024);
  //   // if (files.image) {
  //   //   if (files.image.size > sizeImage) {
  //   //     res.status(400).json({
  //   //       error: "kích thước file vượt quá 1 MB ",
  //   //     });
  //   //   }
  //   //   product.image.data = fs.readFileSync(files.image.path);
  //   //   product.image.contentType = files.image.path;
  //   // }
   
  // });

  product.save((err, db) => {
    if (err) {
      res.status(400).json({
        error: "lỗi",
      });
    } else {
      res.json({
        message: "Thêm sản phẩm thành công",
      });
    }
  });
};

//param 
export const productID = (req,res,next,id) =>{
  Products.findById(id).exec((err,product)=>{
    if(err){
      return res.status(400).json({
        error : "không tìm thấy sản phẩm"
      })
    }
    //console.log(product)
    req.product = product
    next()
  })
}

//detail
export const showDetailProduct = (req,res) =>{
  return res.json(req.product)
}
//start update 
export const update = (req,res) =>{
    let product = _.assignIn(req.product,req.body);
    product.save((err, db) => {
      if (err) {
        console.log(err.message)
       return res.status(400).json({
          error: "Cập nhật sản phẩm không thành công",
        });
      } else {
        res.json({
          message: "Sửa sản phẩm thành công",
        });
      }
    });
  //   let form = new formidable.IncomingForm();
  // form.keepExtensions = true;
  // form.parse(req, (err, fields, files) => {
  //   if (err) {
  //     return res.status(400).json({
  //       message: "Thêm sản phẩm không thành công",
  //     });
  //   }
  //   const { name, price } = fields;
  //   if (!name || !price) {
  //     res.status(400).json({
  //       error: "vui lòng nhập đủ trường",
  //     });
  //   }
  //   console.log(fields);
  //   console.log(files);
  //   let product = req.product
  //   product = _.assignIn(product,fields);

  //   const sizeImage = (form.maxFieldsSize = 2 * 1024 * 1024);
  //   if (files.image) {
  //     if (files.image.size > sizeImage) {
  //       res.status(400).json({
  //         error: "kích thước file vượt quá 1 MB ",
  //       });
  //     }
  //     product.image.data = fs.readFileSync(files.image.path);
  //     product.image.contentType = files.image.path;
  //   }
  //   product.save((err, db) => {
  //     if (err) {
  //       res.status.json({
  //         error: "lỗi",
  //       });
  //     } else {
  //       res.json({
  //         message: "sửa sản phẩm thành công",
  //       });
  //     }
  //   });
  // });
}
//start delete
export const deleteProducts = (req, res) => {
  console.log(req.product);
  let product = req.product
  product.remove((err,db)=>{
    if(err){
      res.json({
        error : "xoá không thành công"
      })
    }
    res.json({
      db,
      message : `xoá thành công sản phẩm ${db.name}`
    })
  })
};

//start hiển thị danh sách
export const showList = async (req, res, next) => {
  const sortBy = {};
  //start  phân trang
  const { page, limit, sort } = req.query;
  if (page && limit) {
    const myCustomLabels = {
      totalDocs: "itemCount",
      docs: "products",
      limit: "perPage",
      page: "currentPage",
      nextPage: "next",
      prevPage: "prev",
      totalPages: "pageCount",
      pagingCounter: "slNo",
      meta: "paginator",
    };
    const options = {
      page: page || 1,
      limit: limit || 8,
      customLabels: myCustomLabels,
      collation: {
        locale: "en",
      },
    };
    Products.paginate({}, options, function (err, db) {
      if (err) throw err;
      else res.json(db.products);
      console.log(`page : ${page} , limit : ${limit}`);
    });
  } else if (limit) {
    const products = await Products.find({}).limit(parseInt(limit));
    console.log(`page : ${limit}`);
    res.json(products);
  }

  //start sort products
  else if (sort) {
    const str = req.query.sort.split(":");
    sortBy[str[0]] = str[1] === "desc" ? -1 : 1;
    const products = await Products.find({}).sort(sort);
    console.log(products);
    res.json(products);
  } else {
    Products.find({})
      .then((products) => {
        products = products.map((products) => products.toObject() );
       
        res.json(products);
      })
      .catch(next);
  }
};

export const photo = (req,res,next) =>{
  if(req.product.image.data){
    res.set("Content-Type",req.product.image.contentType)
    return res.send(req.product.image.data)
  }
  next()
}



