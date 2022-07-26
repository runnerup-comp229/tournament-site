
import express from 'express';
import passport from 'passport';

// we need import user model 
import user from '../Models/user';

export function DisplayLoginPage(req: express.Request, res: express.Response, next: express.NextFunction)
{
   res.render('index',{title:'Login',page:'login',message: req.flash('loginMessage'),displayName: ''});
}

export function DisplayRegisterPage(req : express.Request, res : express.Response, next : express.NextFunction)
{
    res.render('index',{title:'Register',page:'register',message: req.flash('registerMessage'),displayName: ''});
}


export function ProcessLoginPage(req: express.Request, res: express.Response, next: express.NextFunction)
{
    
}

export function ProcessRegisterPage(ProcessRegisterPage: express.Request, res: express.Response, next: express.NextFunction)
{
   
}
export function ProcessLogoutPage(req: express.Request, res: express.Response, next: express.NextFunction)
{
    
}