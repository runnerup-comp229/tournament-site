import express from 'express';
const router = express.Router();

import Tournament from '../Models/tournament';

// import the controller module
import {DisplayAddPage, DisplayEditPage, DisplayFinalPage, DisplayFirstRoundPage, DisplayLandingPage, DisplayRunnerUpPage, DisplaySemiFinalPage, ProcessAddPage, ProcessDeletePage, ProcessEditPage } from "../Controllers/tournament";
import { CallbackError } from 'mongoose';

/* Display home page. */
router.get('/', DisplayLandingPage);

/* Display home page. */
router.get('/home', DisplayLandingPage);

/* Display add page. */
router.get('/add', DisplayAddPage);

/* Process add page. */
router.post('/add', ProcessAddPage);

/* Display First Round page*/
router.get('/:id', DisplayFirstRoundPage);

/* Display Edit page */
router.get('/edit/:id', DisplayEditPage);

/* Process Edit page */
router.post('/edit/:id', ProcessEditPage);

/* Process delete page */
router.get('/delete/:id', ProcessDeletePage);

/* Display semi final page*/
router.get('/:id/semifinal', DisplaySemiFinalPage);

/* Display runner up page*/
router.get('/:id/runnerup', DisplayRunnerUpPage);


/* Display final */
router.get('/:id/final', DisplayFinalPage);

/* Display manage page */
router.get('/manage/:id', (req, res, next) => {
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
        title: 'Manage',
        page: 'manage',
        tournament : tournamentToEdit
      })};
    });
});

// process manage page
router.post('/manage/:id', (req, res, next) => {
    let id = req.params.id;
     Tournament.findById(id, {}, {}, (err, tournament ) => {
         if (err)
         {
           return console.error(err);
         } 
         let updateTournament = new Tournament
            ({  "_id": id,
                "Name" : tournament.Name,
                "Owner" : tournament.Owner,
                "isActive" : true,
                "Participants" : [req.body.team1,req.body.team2,req.body.team3,req.body.team4,req.body.team5,req.body.team6,req.body.team7,req.body.team8],
                "SemiFinal" : [req.body.sfteam1,req.body.sfteam2,req.body.sfteam3,req.body.sfteam4],
                "Final" : [req.body.fteam1,req.body.fteam2],
                "RunnerUp" : [req.body.ruteam1,req.body.ruteam2],
                "First": req.body.first,
                "Second": req.body.second,
                "Third": req.body.third,
                "Fourth": req.body.fourth
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
export default router;