import express from 'express';
const router = express.Router();

import Tournament from '../Models/tournament';

// import the controller module
import {DisplayHomePage } from "../Controllers/index";
import { CallbackError } from 'mongoose';

/* Display home page. */
router.get('/', DisplayHomePage);

/* Display home page. */
router.get('/home', DisplayHomePage);

/* Display First Round */
router.get('/:id', (req : express.Request, res : express.Response, next : express.NextFunction) =>
{
    let id = req.params.id;

    // fetch contact by id
    Tournament.findById(id, {}, {}, function(err, tournamentToView)
    {
        if (err) 
        {
            console.error(err);
            res.end(err);
        }

        // show the edit page with the data
        res.render('index', {title: 'First Round', page: 'tournament-firstround', tournament: tournamentToView});
    });
})

// delete tournament
router.get('/delete/:id', (req : express.Request, res : express.Response, next : express.NextFunction) =>
{
    let id = req.params.id;

    // remove contact by id
    Tournament.remove({"_id" : id}, function(err : CallbackError)
    {
        if (err)
        {
            console.error(err);
            res.end(err);
        };

        //delete was successful
        res.redirect('/home');
    });
});

export default router;