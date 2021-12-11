const express = require('express');
const path = require('path');
const port = 8000;
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const sassMiddleware = require('node-sass-middleware')
const app = express();


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));  

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle : 'extended',
    prefix : '/css'
}));
app.use(express.urlencoded()); // this is parser(midleware)used to get data from req(req.body)which is being sent by form in views
app.use(express.static('assets')); // middleware to give asset path to static files
app.use(cookieParser());
//use express router
app.use('/', require('./routes/index'));

// app.get('/', function(req,res){
//     return res.render('home',{
//         title:'home'
//     });
// })

app.listen(port,function(err){
    if(err)
    {
        console.log('ERROR!!!',err);
    }

    console.log('server running on port:',port);
})