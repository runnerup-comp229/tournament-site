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

/* Display add page. */
router.get('/add', (req : express.Request, res : express.Response, next : express.NextFunction) =>
{
    res.render('index', {title: 'Add', page: 'edit', tournament: ''});
});

/* process page. */
router.post('/add', (req : express.Request, res : express.Response, next : express.NextFunction) =>
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
});

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

// display edit page
router.get('/edit/:id', (req, res, next) => {
    // declaring and initializing id variable with id property of req object
    let id = req.params.id;

    // fetch book by id
    Tournament.findById(id, {}, {}, (err, tournamentToEdit ) => {
      if (err)
      {
        return console.error(err);
      } 
      else {
      // show the books/details page with the data
      res.render('index', {
        title: 'Edit',
        page: 'edit',
        tournament : tournamentToEdit
      })};
    });
});

// process edit page
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;
     Tournament.findById(id, {}, {}, (err, tournament ) => {
         if (err)
         {
           return console.error(err);
         } 
         let updateTournament = new Tournament
            ({  "_id": id,
                "Name" : req.body.name,
                "Owner" : req.body.owner,
                "isActive" : true,
                "Participants" : [tournament.Participants[0],tournament.Participants[1],tournament.Participants[2],tournament.Participants[3],tournament.Participants[4],tournament.Participants[5],tournament.Participants[6],tournament.Participants[7]]
            });

            // insert the new contact object into the database (contacts collection)
    Tournament.updateOne({"_id" : id}, updateTournament, function(err : CallbackError)
    {
        if (err)
        {
            console.error(err);
            res.end(err);
        };

        // edit successful -> redirect back to contact-list page
        res.redirect('/home');
    });
      });

      

    
});

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


/* Display First Round */
router.get('/:id/semifinal', (req : express.Request, res : express.Response, next : express.NextFunction) =>
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

export default router;