
import express from 'express';

export function DisplayLoginPage(req: express.Request, res: express.Response, next: express.NextFunction)
{
   res.render('index',{title:'Login',page:'login', tournament:''});
}

export function DisplayRegisterPage(req : express.Request, res : express.Response, next : express.NextFunction)
{
    res.render('index',{title:'Register',page:'register'});
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
