import express from 'express';
import { CallbackError } from 'mongoose';
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

// display add page
export function DisplayAddPage(req : express.Request, res : express.Response, next : express.NextFunction) 
{
    res.render('index', {title: 'Add', page: 'edit', tournament: ''});
}

// process add page
export function ProcessAddPage(req : express.Request, res : express.Response, next : express.NextFunction) 
{
    // instantiate a new contact to Add
    let newTournament = new Tournament
    ({
        "Name" : req.body.name,
        "Owner" : req.body.owner,
        "isActive" : true,
        "Participants" : [req.body.team1, req.body.team2, req.body.team3, req.body.team4, req.body.team5, req.body.team6,req.body.team7, req.body.team8]
    });

    // insert the new contact object into the database (contacts collection)
    Tournament.create(newTournament, function(err : CallbackError)
    {
        if (err)
        {
            console.error(err);
            res.end(err);
        };

        res.redirect('/home');
    });
};