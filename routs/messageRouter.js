const express =require('express');
const messageRouter = express.Router();
const path = require('path');
const messageController = require(path.resolve('controllers','messageController'));
const validationMiddleware = require(path.resolve('middleware','validation'));



messageRouter.get('/',(req,res)=>{messageController.messageList(req,res)});
 messageRouter.post('/createMessage',(req,res)=>{messageController.createMessage(req,res)});



module.exports = messageRouter;