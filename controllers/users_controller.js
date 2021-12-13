const User = require('../models/user');
module.exports.login=function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');
    }
    return res.render('login',{
        title:'Login'
    });
};

module.exports.profile = function(req,res)
{
    
            
            return res.render('profile',{
                // title: locals.user.name,
                // user:locals.user
            });
       
        
    
};

module.exports.create = function(req,res){
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
            req.body.score=0;
            User.create(req.body,function(err,user){
                if(err)
                {
                    console.log('Error in creating user',err);
                    return;
                }
                console.log(user);
                return res.redirect('/user/login');
            })
        }
    });


};

module.exports.createSession=function(req,res){

   return res.redirect('/');
};


