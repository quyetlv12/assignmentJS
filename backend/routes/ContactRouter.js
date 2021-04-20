import { showListContact,ContactDetail,addContact,deleteContact,editContact,newById} from '../controller/ContactController';
import {requireSignin, isAuth,isAdmin} from '../controller/authController'

import express from 'express'
import { userById } from '../controller/userController';
const ContactRouter = express.Router();
ContactRouter.get('/contact' , showListContact);
ContactRouter.get('/contact/:contactId' , ContactDetail);
ContactRouter.post('/contact/:UserId',requireSignin,isAuth,isAdmin,addContact)
ContactRouter.put('/contact/:contactId/:UserId',requireSignin,isAuth,isAdmin,editContact)
ContactRouter.delete('/contact/:contactId/:UserId',requireSignin,isAuth,isAdmin,deleteContact)
ContactRouter.param('contactId' , newById)
ContactRouter.param('UserId', userById)

module.exports = ContactRouter;
