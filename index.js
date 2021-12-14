const express = require('express');
const path = require('path');
const port = 8000;
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const sassMiddleware = require('node-sass-middleware')
const app = express();
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

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


app.use(session({
    name: 'notenation',
    secret: 'superman',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge: (1000*60*100)
    },
    store:  MongoStore.create(
        {
            mongooseConnection: db,
            mongoUrl: 'mongodb://localhost/easyNotesDB',
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
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