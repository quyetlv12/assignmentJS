//start import api
import mongodb from '../config/API'

//start import model user
import User from '../model/usersModel';

//start connect mongo
mongodb.connect();

//start add user 

export const addUser = (req,res,next) =>{
  res.json({
    name : "that is add user"
  })
}

//end add user



//start delete user 

export const deleteUser = (req,res,next) =>{
  res.json({
    name : "that is delete user"
  })
}

//end delete user

//start edit user
export const editUser = (req,res,next) =>{
  res.json({
    name : "that is edit user"
  })
}
//end edit user



//start show list user
export const showListUser = (req,res,next) =>{
    User.find({})
    .then(user => {
      user = user.map(user => user.toObject())
      res.json({user})
    }
    )
    .catch(next)
        
}

//end show list user