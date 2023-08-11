const express = require('express');
const { signup, login } = require('../contrllers/userControllers');
const userRouter = express.Router();

userRouter.post('/' , signup);
userRouter.post('/login',login);

module.exports = userRouter;