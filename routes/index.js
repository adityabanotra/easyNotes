const express = require('express');

const Router = express.Router();
const homeController = require('../controllers/home_controller');
console.log('route loaded');
Router.get('/', homeController.home);

Router.use('/user', require('./users'));

Router.get('/explore',function(req,res){
    return res.render('explore',{
        title:'Explore'
    });
});

module.exports = Router;