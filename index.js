const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Work = require('./models/work');
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

    Work.find({}, function(err, works){
        if(err)
        {
            console.log('error in finding error');
            return;
        }
    
    return res.render('home',{
        title:"easyNotes",
        work : works
    });

});
})


app.get('/delete-it/:id', function(req,res){
    const id =(req.params.id);
    
    Work.findByIdAndDelete(id,function(err){
        if(err)
        {
            console.log('Error in deleting an object from DB');
            return;
        }

        return res.redirect('back');
    })

})
app.get('/profile', function(req,res){
    return res.render('profile');
})

app.post('/add-work', function(req,res){
    Work.create({
        name: req.body.work,
        time: req.body.time
    },
    function(err,newWork){
        if(err){
            console.log('error in creating a work');
            return;
        }

        console.log('*****',newWork);
        return res.redirect('back');
    })
})

app.listen(port,function(err){
    if(err)
    {
        console.log('ERROR!!!',err);
    }

    console.log('server running on port:',port);
})