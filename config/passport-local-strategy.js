const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
//authentication using passport.js
passport.use(new LocalStrategy({
        usernameField: 'email',
    },
    function(email,password,done){
        //find user and establish identity
        User.findOne({email : email}, function(err,user){
            if(err){
                console.log('Error in finding user');
                return done(err);
            }
            if(!user|| user.password!= password)
            {
                console.log('Invalid username/password');
                return done(null, false);
            }

            return done(null,user);
    
        });
    }
));

//serealising the user to decide which key to kept in cookie

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err)
        {
            console.log('error in finding user');
            return done(err);
        }

        return done(null,user);
    });
});

passport.checkAuthentication= function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/user/login');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signedin user
        // we are sending to use this as locals.user
        res.locals.user = req.user;
    }
    next();
}
module.exports=passport;


 