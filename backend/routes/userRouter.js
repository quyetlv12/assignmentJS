import { showListUser , addUser} from '../controller/userController';
import express from 'express'
const UsersRouter = express.Router();
UsersRouter.get('/users' , showListUser);
UsersRouter.post('/users' , addUser)

module.exports = UsersRouter;
