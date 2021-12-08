const express = require('express');

const Router = express.Router();
const homeController = require('../controllers/home_controller');
console.log('route loaded');
Router.get('/', homeController.home);
Router.get('/login',function(req,res){
    return res.render('login',{
        title:'Login'
    });
});
module.exports = Router;