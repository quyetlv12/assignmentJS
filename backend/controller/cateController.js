

//start import model user
import Categories from '../model/categoryModel';


//start hiển thị danh sách
export const showListCate = (req,res,next) =>{
    Categories.find({})
    .then(categories => {
        categories = categories.map(categories => categories.toObject())
      res.json(categories)
    }
    )
    .catch(next)
}

//start add cate

export const addCategories = (req,res,next) =>{
    res.json({
        name : "that  is add categories"
    })
}


//start delete cate

export const deleteCategories = (req,res,next) =>{
    res.json({
        name : "that  is delete categories"
    })
}


//start edit cate 

export const editCategories = (req,res,next) =>{
    res.json({
        name : "that  is edit categories"
    })
}