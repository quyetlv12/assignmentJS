import Products from "../model/productModel";
//lấy dữ liệu form
import formidable from "formidable";
//đọc file buffer
import fs from "fs";
//add products
export const addProducts = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: "Thêm sản phẩm không thành công",
      });
    }
    const { name, price } = fields;
    if (!name || !price) {
      res.status(400).json({
        error: "vui lòng nhập đủ trường",
      });
    }
    console.log(fields);
    console.log(files);
    let product = new Products(fields);
    const sizeImage = (form.maxFieldsSize = 1 * 1024 * 1024);
    if (files.image) {
      if (files.image.size > sizeImage) {
        res.status(400).json({
          error: "kích thước file vượt quá 1 MB ",
        });
      }
      product.image.data = fs.readFileSync(files.image.path);
      product.image.contentType = files.image.path;
    }
    product.save((err, db) => {
      if (err) {
        res.status.json({
          error: "lỗi",
        });
      } else {
        res.json({
          message: "Thêm sản phẩm thành công",
        });
      }
    });
  });
};

//start edit
export const editProducts = (req, res, next) => {
  Products.updateOne(req.body, (err, db) => {
    if (err)
      res.status(400).json({
        message: "lỗi rồi !!!",
      });
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
      console.log(`page : ${page} , limit : ${limit}` )});
  }
  else if(limit){
    const products = await Products.find({}).limit(parseInt(limit))
    console.log(`page : ${limit}`);
    res.json(products)
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
        products = products.map((products) => products.toObject());
        res.json(products);
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
      res.json(product == null ? "sản phẩm không tồn tại" : product);
    }
  });
};
