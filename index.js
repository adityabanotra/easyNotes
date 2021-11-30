const express = require('express');
const path = require('path');
const port = 8000;

const app = express();
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));  
app.use(express.urlencoded()); // this is parser(midleware)used to get data from req(req.body)which is being sent by form in views
app.use(express.static('assets')); // middleware to give asset path to static files
var work = [
    {
        work : "gym",
        time : "6AM" 
    },
    {
        work : "shower",
        time : "8AM" 
    },
    {
        work : "breakfast",
        time : "8:45AM"
    }
];

app.get('/', function(req,res){
    return res.render('home',{
        title:"easyNotes",
        work : work
    });
})



app.get('/profile', function(req,res){
    return res.render('profile');
})

app.post('/add-work', function(req,res){
    work.push(req.body);
    return res.redirect('/');
})

app.listen(port,function(err){
    if(err)
    {
        console.log('ERROR!!!',err);
    }

    console.log('server running on port:',port);
})