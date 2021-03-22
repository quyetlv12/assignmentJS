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
  const sortBy = {}
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
      console.log(db.products);
    });
  }

  //start sort products
  else if (sort) {
    const str = req.query.sort.split(':')
    sortBy[str[0]] = str[1] === 'desc' ? -1:1
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
