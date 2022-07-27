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
    res.render('index',{title:'Register',page:'register',messages: req.flash('registerMessage') ,displayName: UserDisplayName(req)});
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