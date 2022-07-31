import express from 'express';
import passport from 'passport';

// we need import user model 
import user from '../Models/user';
import { UserDisplayName } from '../Util';
export function DisplayLoginPage(req: express.Request, res: express.Response, next: express.NextFunction)
{
   res.render('index',{title:'Login',page:'login',messages: req.flash('loginMessage'), displayName: UserDisplayName(req)});
}

export function DisplayRegisterPage(req : express.Request, res : express.Response, next : express.NextFunction)
{
    res.render('index',{title:'Register',page:'register',messages: req.flash('registerMessage') ,displayName: UserDisplayName(req),err: ''});
}


export function ProcessLoginPage(req: express.Request, res: express.Response, next: express.NextFunction)
{
    passport.authenticate('local', function(err, user, info)
   {
    // are there server errors?
    if(err)
    {
        console.error(err);
        res.end(err);
    }

    // are there login errors?
    if(!user)
    {
        req.flash('loginMessage', 'Authentication Error!');
        return res.redirect('/login');
    }

    // no problems - we have a good username and password
    req.logIn(user, function(err)
    {
        // are there db errors?
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        return res.redirect('/home');
    });
   })(req, res, next);
}


export function ProcessRegisterPage(req: express.Request, res: express.Response, next: express.NextFunction)
{
    let newUser = new user
    ({
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        DisplayName: req.body.firstName + " " + req.body.lastName
    });

    user.register(newUser, req.body.password, function(err)
    {
        if(err)
        {
            if(err.name == "UserExistsError")
            {
                console.error('ERROR: User Already Exists!');
                req.flash('registerMessage', 'Registration Error!');
            }
            else
            {
                console.error(err.name); // other error
                req.flash('registerMessage', 'Server Error');
            }
            return res.redirect('/home');
        }

        // everything is ok - user has been registered

        // automatically login the user
        return passport.authenticate('local')(req, res, function()
        {
            return res.redirect('/home');
        });
     });
}

export function ProcessLogoutPage(req: express.Request, res: express.Response, next: express.NextFunction): void
{
    req.logOut(function(err)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        console.log("User Logged Out");
    });

    res.redirect('/login');
}