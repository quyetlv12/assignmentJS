//start import model user
import Categories from "../model/categoryModel";

//start hiển thị danh sách danh mục
export const showListCate = (req, res, next) => {
  Categories.find({})
    .then((categories) => {
      categories = categories.map((categories) => categories.toObject());
      res.json(categories);
    })
    .catch(next);
};

//start add cate

export const addCategories = (req, res, next) => {
  res.json({
    name: "that  is add categories",
  });
};

//start delete cate

export const deleteCategories = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Categories.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

//start edit cate

export const editCategories = (req, res, next) => {
  res.json({
    name: "that  is edit categories",
  });
};
