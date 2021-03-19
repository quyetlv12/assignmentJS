import mongodb from "../config/API";
import Products from "../model/productModel";

//start kết nối tới mongodb
mongodb.connect();

//start tạo phương thức thêm sửa xoá hiển thị sản phẩm

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
    console.log(error.message);
  }
};

//start hiển thị danh sách
export const showList = async (req, res, next) => {
  //start giới hạn sản phẩm
  if (req.query._limit) {
    const products = await Products.find({}).limit(parseInt(req.query._limit));
    console.log(products);
    res.json({ products });
    return false;
  } else if (req.query._sort) {
    const products = await Products.find({}).sort(req.query._sort);
    console.log(products);
    res.json({ products });
    return false;
  } else if (req.query._page) {
    let pageNumber =
      req.query._page == 0 ? (req.query._page = 1) : parseInt(req.query._page);
    const products = await Products.find({})
      .limit(5)
      .skip(pageNumber)
      .exec((err, product) => {
        Products.countDocuments((err, count) => {
          if (err) throw err;
          else res.json(product);
          console.log("tổng số trang là :", count);
        });
      });
    return false;
  } else {
    Products.find({})
      .then((products) => {
        products = products.map((products) => products.toObject());
        res.json({ products });
      })
      .catch(next);
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
      res.json(product == null ? "sản phẩm không tồn tại" : { product });
    }
  });
};
