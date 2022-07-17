import express from 'express';
import Tournament from '../Models/tournament'; 

// display landing page
export function DisplayLandingPage(req : express.Request, res : express.Response, next : express.NextFunction) 
{
    Tournament.find(function(err, tournaments)
    {
        if (err) 
        {
            console.error(err);
            res.end(err);
        }

        // show the edit page with the data
        res.render('index', {title: 'Home', page: 'home', tournament: tournaments});
    });
};