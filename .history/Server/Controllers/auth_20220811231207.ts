import { CallbackError } from 'mongoose';
import express from 'express';
import passport  from 'passport';

// we need import user model 
import user from '../Models/user';
import { UserDisplayName, getUserId } from '../Util';
export function DisplayLoginPage(req: express.Request, res: express.Response, next: express.NextFunction)
{
   res.render('index',{title:'Login',page:'login',user: '', messages: req.flash('loginMessage'), displayName: UserDisplayName(req), userId: getUserId(req)});
}

export function DisplayRegisterPage(req : express.Request, res : express.Response, next : express.NextFunction)
{
    res.render('index',{title:'Register',page:'register', user: '', messages: req.flash('registerMessage') ,displayName: UserDisplayName(req),err: '', userId: getUserId(req)});
}

export function DisplayUpdatePage(req : express.Request, res : express.Response, next : express.NextFunction)
{
    // declaring and initializing id variable with id property of req object
    let id = req.params.id;

    // fetch tournament by id
    user.findById(id, {}, {}, (err, userToUpdate ) => {
      if (err)
      {
        return console.error(err);
      } 
      else {
      // show the edit page with the data
      res.render('index',{title:'Update',page:'register', user: userToUpdate, messages: req.flash('registerMessage') ,displayName: UserDisplayName(req),err: '', userId: getUserId(req)})};
    });

}

export function ProcessUpdatePage(req : express.Request, res : express.Response, next : express.NextFunction)
{
    // declaring and initializing id variable with id property of req object
    let id = req.params.id;

    user.findById(id, function (err : CallbackError, User : any) {

        if (!user) {
            
             return console.error(err);
        }

        if (req.body.password != "" && req.body.confirmPassword != ""){
        User.changePassword(req.body.password, req.body.confirmPassword, function(err : CallbackError) {
            if (err){
                
                return console.error(err);
            }
        })};

        // no need for else since you are returning early ^
        User.username = req.body.username;
        User.EmailAddress = req.body.emailAddress;
        User.DisplayName = req.body.firstName + " " + req.body.lastName;
        User.FirstName =  req.body.firstName;
        User.LastName  = req.body.lastName;
        

        User.save(function (err: CallbackError) {
            if (err) {
                return console.error(err);
            };
            res.redirect('/');
        });
    });

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
        FirstName : req.body.firstName,
        LastName : req.body.lastName,
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