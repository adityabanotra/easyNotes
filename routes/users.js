const express = require('express');

const Router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users_controller');

Router.get('/login', userController.login);
Router.get('/profile', passport.checkAuthentication,  userController.profile);
Router.post('/create', userController.create);
// use passport as a middleware to authenticate
Router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/user/login'},
), userController.createSession );




module.exports = Router;


