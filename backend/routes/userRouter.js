import { showListUser , addUser ,deleteUser , userById , editUser,detailUser} from '../controller/userController';
import express from 'express'
const UsersRouter = express.Router();
import {userSignupValidator} from '../validator'
import {requireSignin, isAdmin, isAuth,checkAdmin} from '../controller/authController'
UsersRouter.get('/secret/:UserId',requireSignin,isAuth,isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
});

UsersRouter.get('/users',showListUser);
UsersRouter.get('/users/:UserId',requireSignin,isAuth,detailUser);
// UsersRouter.post('/users' ,requireSignin,isAdmin,addUser)
UsersRouter.put('/users/:UserId', requireSignin,editUser)
UsersRouter.delete('/users/:UserId', requireSignin,isAdmin,deleteUser)

UsersRouter.param('UserId', userById)

module.exports = UsersRouter;
