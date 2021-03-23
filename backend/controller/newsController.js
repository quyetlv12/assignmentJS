

//start import model News
import News from '../model/newsModel';



//start add News 

export const addNews = (req,res,next) =>{
  res.json({
    name : "that is add News"
  })
}

//end add News

//start show detail Newsr




//start delete News 

export const deleteNews = (req,res,next) =>{
  res.json({
    name : "that is delete News"
  })
}

//end delete News

//start edit News
export const editNews = (req,res,next) =>{
  res.json({
    name : "that is edit News"
  })
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
  const id = req.params.id;
  News.findById(id, (err, db) => {
    if (err) {
      res.json({
        message: "sản phẩm không tồn tại",
      });
    } else {
      res.json(db == null ? "sản phẩm không tồn tại" : db);
    }
  });
};