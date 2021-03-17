import { showListUser } from '../controller/userController';
import express from 'express'

const UsersRouter = express.Router();


UsersRouter.get('/users' , showListUser);

module.exports = UsersRouter;
