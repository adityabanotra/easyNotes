const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    time:{
        type : String,
        required : true
    }
});

const Work = mongoose.model('Work', workSchema);
module.exports = Work;