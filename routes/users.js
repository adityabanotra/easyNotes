const express = require('express');

const Router = express.Router();
const userController = require('../controllers/users_controller');

Router.get('/login', userController.login);
Router.get('/profile', userController.profile);
Router.post('/create', userController.create);
Router.post('/create-session', userController.createSession);




module.exports = Router;


