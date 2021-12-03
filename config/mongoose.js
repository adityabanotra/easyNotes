const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/easyNotesDB');

const db = mongoose.connection;

db.on('error', console.error.bind(console,'error connecting DB'));

db.once('open', function(){
    console.log('DB Connected Successfully');
})