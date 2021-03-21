
import Products from "../model/productModel";

//start add
export const addProducts = (req, res, next) => {
  const data = req.body;
  Products.create(data, (err, db) => {
    if (err) throw err;
    else console.log("thêm thành công", db.name);
    res.json({ message: "thêm thành công" });
  });
};

//start edit
export const editProducts = (req, res, next) => {
  Products.updateOne(req.body, (err, db) => {
    if (err) throw err;
    else res.json(req.body);
    console.log(req.body);
  });
};

//start delete
export const deleteProducts = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Products.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

//start hiển thị danh sách
export const showList = async (req, res, next) => {
  const myCustomLabels = {
    totalDocs: 'itemCount',
    docs: 'products',
    limit: 'perPage',
    page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'pageCount',
    pagingCounter: 'slNo',
    meta: 'paginator',
  };
    const options = {
      page: req.query.page || 1,
      limit : req.query.limit || 8,
      customLabels : myCustomLabels,
      collation: {
        locale: 'en',
      },
      
    };
    if(options){
      Products.paginate({}, options, function (err, db) {
        if(err) throw err
        else res.json(db.products)
        console.log(db.products);
      })
    }
    else{
      Products.find({})
          .then(products =>{
            products = products.map(products => products.toObject())
            res.json(product)
          })
    }
    
   
 
  
 
};
//start show detail products
export const showDetailProduct = (req, res, next) => {
  const id = req.params.id;
  Products.findById(id, (err, product) => {
    if (err) {
      res.json({
        message: "sản phẩm không tồn tại",
      });
    } else {
      res.json(product == null ? "sản phẩm không tồn tại" : product);
    }
  });
};
