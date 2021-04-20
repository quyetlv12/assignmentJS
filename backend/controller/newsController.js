

//start import model News
import News from '../model/newsModel';
import _ from 'lodash';



//start add News 
export const newById = (req,res,next,id) =>{
  News.findById(id).exec((err,news)=>{
    if(err || !news) {
      res.status(400).json({
        error : 'error'
      })
    }
    req.news = news
    next()
  })
}
export const addNews = (req,res,next) =>{
  const news = new News(req.body)
  news.save((err,news)=>{
    if(err){
      res.status(400).json({
        err : "thêm bài viết không thành công"
      })
    }
    res.status(200).json(
      news
    )
  })
}

//end add News

//start show detail Newsr




//start delete News 

export const deleteNews = (req,res,next) =>{
  let news = req.news
  news.remove((err,db)=>{
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
}

//end delete News

//start edit News
export const editNews = (req,res,next) =>{
  let news = _.assignIn(req.news,req.body);
  news.save((err, db) => {
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
}
//end edit News



//start show list News
export const showListNews = (req,res,next) =>{
    News.find({})
    .then(News => {
      News = News.map(News => News.toObject())
      res.json(News)
    }
    )
    .catch(next)
        
}

//end show list News


//start show detail 
export const newsDetail = (req, res, next) => {
 return res.json(req.news)
};