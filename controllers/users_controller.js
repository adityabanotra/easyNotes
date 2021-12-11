const User = require('../models/user');
module.exports.login=function(req,res){
    return res.render('login',{
        title:'Login'
    });
};


module.exports.create=function(req,res){
    if(req.body.password!=req.body.conpass)
    {
        return res.redirect('back');
    }

    User.findOne({email : req.body.email},function(err,user){
        if(err)
        {
            console.log('Error in creating user',err);
            return;
        }

        if(user)
        {
            console.log('User already present');
            return res.redirect('back');
        }
        else
        {
            User.create(req.body,function(err,user){
                if(err)
                {
                    console.log('Error in creating user',err);
                    return;
                }
                return res.redirect('/user/login');
            })
        }
    });


};

module.exports.createSession=function(req,res){
    

};