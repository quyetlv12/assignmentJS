import { showListUser } from '../controller/userController';
import express from 'express'

const router = express.Router();


router.get('/users' , showListUser);

module.exports = router;
