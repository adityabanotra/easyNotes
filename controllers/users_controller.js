const User = require('../models/user');
module.exports.login=function(req,res){
    return res.render('login',{
        title:'Login'
    });
};

module.exports.profile = function(req,res)
{
    if(req.cookies.user_id)
    {
        User.findById(req.cookies.user_id, function(err,user){
            
            if(err)
            {
                console.log('Error'.err);
                return;
            }
            
            return res.render('profile',{
                title: user.name,
                user:user
            });
        })
        
    }
    else
    {
        return res.redirect('user/login');
    }
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

    User.findOne({email : req.body.email}, function(err,user){
        if(err)
            {
                console.log('Error in creating session',err);
                return;
            }
        if(!user)
        {
           
            console.log('User not found');
        }
        else
        {
            if(req.body.password!=user.password)
            {
                console.log('Password wrong');
                return res.redirect('back');
            }

            res.cookie('user_id',user.id);
            return res.redirect('/');
        }
    })
};


