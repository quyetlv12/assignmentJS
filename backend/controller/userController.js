//start import api
import mongodb from '../config/API'

//start import model user
import User from '../model/users';

//start connect mongo
mongodb.connect();

export const showListUser = (req,res,next) =>{
    User.find({})
    .then(user => {
      user = user.map(user => user.toObject())
      res.json({user})
    }
    )
    .catch(next)
        
}