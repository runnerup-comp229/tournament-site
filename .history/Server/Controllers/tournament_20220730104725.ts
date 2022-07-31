import express from 'express';
import { CallbackError } from 'mongoose';
import Tournament from '../Models/tournament'; 
import { getUserId, UserDisplayName } from '../Util';
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

        // show the landing page with the data
        res.render('index', {title: 'Home', page: 'home', tournament: tournaments, displayName: UserDisplayName(req), userId : getUserId(req)});
    });
};

// display my tournament page
export function DisplayMyTournamentPage(req : express.Request, res : express.Response, next : express.NextFunction) 
{
    Tournament.find({ "Owner.Id" : getUserId(req) } , function(err : CallbackError, tournaments : any)
    {
        if (err) 
        {
            console.error(err);
            res.end(err);
        }

        // show the landing page with the data
        res.render('index', {title: 'My Tournaments', page: 'mytournaments', tournament: tournaments, displayName: UserDisplayName(req), userId : getUserId(req)});
    });
};


// display add page
export function DisplayAddPage(req : express.Request, res : express.Response, next : express.NextFunction) 
{
    res.render('index', {title: 'Add', page: 'edit', tournament: '', displayName: UserDisplayName(req)});
}

// process add page
export function ProcessAddPage(req : express.Request, res : express.Response, next : express.NextFunction) 
{
    // instantiate a new tournament to Add
    let newTournament = new Tournament
    ({
        "Name" : req.body.name,
        "Owner" : {"Id" : getUserId(req), "DisplayName": UserDisplayName(req)},
        "isActive" : true,
        "Participants" : [req.body.team1, req.body.team2, req.body.team3, req.body.team4, req.body.team5, req.body.team6,req.body.team7, req.body.team8],
        "SemiFinal" : ["","","",""],
        "Final" : ["",""],
        "RunnerUp" : ["",""],
        "First": "",
        "Second": "",
        "Third": "",
        "Fourth": ""
    });

    // insert the new tournament object into the database (runnerup collection)
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


// display first round page
export function DisplayCurrentRound(req : express.Request, res : express.Response, next : express.NextFunction) 
{
    let id = req.params.id;

    // fetch tournament by id
    Tournament.findById(id, {}, {}, function(err, tournamentToView)
    {
        if (err) 
        {
            console.error(err);
            res.end(err);
        }

        // show the first round page with the data
        if (tournamentToView.First != "" && tournamentToView.Second != "" && tournamentToView.Third != "" && tournamentToView.Fourth != "")
        {
            res.redirect('/'+ tournamentToView._id +'/winners');
        } else if (tournamentToView.Final[0] != "" && tournamentToView.Final[1] != ""){
            res.redirect('/'+ tournamentToView._id +'/final');
        }
        else if (tournamentToView.RunnerUp[0] != "" && tournamentToView.RunnerUp[1] != ""){
            res.redirect('/'+ tournamentToView._id +'/runnerup');
        }
        else if (tournamentToView.SemiFinal[0] != "" && tournamentToView.SemiFinal[1] != "" && tournamentToView.SemiFinal[2] != "" && tournamentToView.SemiFinal[3] != ""){
            res.redirect('/'+ tournamentToView._id +'/semifinal');
        } else {
            res.redirect('/'+ tournamentToView._id +'/firstround');
        }
        
    });
}

export function DisplayFirstRound(req : express.Request, res : express.Response, next : express.NextFunction) 
{
    let id = req.params.id;

    // fetch tournament by id
    Tournament.findById(id, {}, {}, function(err, tournamentToView)
    {
        if (err) 
        {
            console.error(err);
            res.end(err);
        }

        // show the first round page with the data
        res.render('index', {title: 'First-round', page: "tournament-firstround", tournament: tournamentToView, displayName: UserDisplayName(req)});
    });
}


/* Display Edit page */
export function DisplayEditPage(req : express.Request, res : express.Response, next : express.NextFunction) 
{
    // declaring and initializing id variable with id property of req object
    let id = req.params.id;

    // fetch tournament by id
    Tournament.findById(id, {}, {}, (err, tournamentToEdit ) => {
      if (err)
      {
        return console.error(err);
      } 
      else {
      // show the edit page with the data
      res.render('index', {
        title: 'Edit',
        page: 'edit',
        tournament : tournamentToEdit, displayName: UserDisplayName(req)
      })};
    });
};

/* Process Edit page */
export function ProcessEditPage(req : express.Request, res : express.Response, next : express.NextFunction) {
    // declaring and initializing id variable with id property of req object
    let id = req.params.id;

    // find tournament with id    
     Tournament.findById(id, {}, {}, (err, tournament ) => {
         if (err)
         {
           return console.error(err);
         } 

         // create new tournament object to update
         let updateTournament = new Tournament
            ({  "_id": id,
                "Name" : req.body.name,
                "Owner" : {"Id" : getUserId(req), "DisplayName": UserDisplayName(req)},
                "isActive" : true,
                "Participants" : [tournament.Participants[0],tournament.Participants[1],tournament.Participants[2],tournament.Participants[3],tournament.Participants[4],tournament.Participants[5],tournament.Participants[6],tournament.Participants[7]],
                "SemiFinal" : [tournament.SemiFinal[0],tournament.SemiFinal[1],tournament.SemiFinal[2],tournament.SemiFinal[3]],
                "Final" : [tournament.Final[0],tournament.Final[1]],
                "RunnerUp" : [tournament.RunnerUp[0],tournament.RunnerUp[1]],
                "First": tournament.First,
                "Second": tournament.Second,
                "Third": tournament.Third,
                "Fourth": tournament.Fourth
            });

            // insert the new tournament object into the database (runnerup collection)
    Tournament.updateOne({"_id" : id}, updateTournament, function(err : CallbackError)
    {
        if (err)
        {
            console.error(err);
            res.end(err);
        };

        // edit successful -> redirect back to landing page
        res.redirect('/home');
    });
      });
};

// delete tournament
export function ProcessDeletePage(req : express.Request, res : express.Response, next : express.NextFunction)
{
    // declaring and initializing id variable with id property of req object
    let id = req.params.id;

    // remove tournament by id
    Tournament.remove({"_id" : id}, function(err : CallbackError)
    {
        if (err)
        {
            console.error(err);
            res.end(err);
        };

        //delete was successful -> redirecting back to the home page
        res.redirect('/home');
    });
};

/* Display semi-final */
export function DisplaySemiFinalPage(req : express.Request, res : express.Response, next : express.NextFunction)
{
    // declaring and initializing id variable with id property of req object
    let id = req.params.id;

    // fetch tournament by id
    Tournament.findById(id, {}, {}, function(err, tournamentToView)
    {
        if (err) 
        {
            console.error(err);
            res.end(err);
        }

        // show the semi final page with the data
        res.render('index', {title: 'Semi-Final', page: 'semifinal', tournament: tournamentToView, displayName: UserDisplayName(req)});
    });
};

/* Display runner-up page*/
export function DisplayRunnerUpPage(req : express.Request, res : express.Response, next : express.NextFunction)
{
    // declaring and initializing id variable with id property of req object
    let id = req.params.id;

    // fetch tournament by id
    Tournament.findById(id, {}, {}, function(err, tournamentToView)
    {
        if (err) 
        {
            console.error(err);
            res.end(err);
        }

        // show the runner-up page with the data
        res.render('index', {title: 'Runner-Up', page: 'runnerup', tournament: tournamentToView, displayName: UserDisplayName(req)});
    });
};


/* Display final */
export function DisplayFinalPage(req : express.Request, res : express.Response, next : express.NextFunction)
{
    // declaring and initializing id variable with id property of req object
    let id = req.params.id;

    // fetch tournament by id
    Tournament.findById(id, {}, {}, function(err, tournamentToView)
    {
        if (err) 
        {
            console.error(err);
            res.end(err);
        }

        // show the final page with the data
        res.render('index', {title: 'Final', page: 'final', tournament: tournamentToView, displayName: UserDisplayName(req)});
    });
};

/* Display manage page */
export function DisplayManagePage(req : express.Request, res : express.Response, next : express.NextFunction)
{
    // declaring and initializing id variable with id property of req object
    let id = req.params.id;

    // fetch tournament by id
    Tournament.findById(id, {}, {}, (err, tournamentToEdit ) => {
      if (err)
      {
        return console.error(err);
      } 
      else {
      // show the manege page with the data
      res.render('index', {
        title: 'Manage',
        page: 'manage',
        tournament : tournamentToEdit, displayName: UserDisplayName(req)
      })};
    });
};

/* Process manage page */
export function ProcessManagePage(req : express.Request, res : express.Response, next : express.NextFunction) 
{
    // declaring and initializing id variable with id property of req object
    let id = req.params.id;

    // fetch tournament by id
     Tournament.findById(id, {}, {}, (err, tournament ) => {
         if (err)
         {
           return console.error(err);
         } 

         // check if the tournament is active
         if (req.body.first == "" || req.body.second  == "" || req.body.third  == "" || req.body.fourth == "" ){

            // create new tournament object with the id to update
            let updateTournament = new Tournament
            ({  "_id": id,
                "Name" : tournament.Name,
                "Owner" : {"Id" : tournament.Owner.Id, "DisplayName": tournament.Owner.DisplayName},
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

                 // insert the new tournament object into the database (runnerup collection)
    Tournament.updateOne({"_id" : id}, updateTournament, function(err : CallbackError)
    {
        if (err)
        {
            console.error(err);
            res.end(err);
        };

        // edit successful -> redirect back to home page
        res.redirect('/home');
    });
        // if the tournament is not active
         } else {
            // create new tournament object to update
            let updateTournament = new Tournament
            ({  "_id": id,
                "Name" : tournament.Name,
                "Owner" : {"Id" : tournament.Owner.Id, "DisplayName": tournament.Owner.DisplayName},
                "isActive" : false,
                "Participants" : [req.body.team1,req.body.team2,req.body.team3,req.body.team4,req.body.team5,req.body.team6,req.body.team7,req.body.team8],
                "SemiFinal" : [req.body.sfteam1,req.body.sfteam2,req.body.sfteam3,req.body.sfteam4],
                "Final" : [req.body.fteam1,req.body.fteam2],
                "RunnerUp" : [req.body.ruteam1,req.body.ruteam2],
                "First": req.body.first,
                "Second": req.body.second,
                "Third": req.body.third,
                "Fourth": req.body.fourth
            });

                 // insert the new tournament object into the database (runnerup collection)
    Tournament.updateOne({"_id" : id}, updateTournament, function(err : CallbackError)
    {
        if (err)
        {
            console.error(err);
            res.end(err);
        };

        // edit successful -> redirect back to landing page
        res.redirect('/home');
    });

         };         
      }); 
};

/* Display winners page */
export function DisplayWinnersPage(req : express.Request, res : express.Response, next : express.NextFunction)
{
    // declaring and initializing id variable with id property of req object
    let id = req.params.id;

    // fetch tournament by id
    Tournament.findById(id, {}, {}, (err, tournamentToEdit ) => {
      if (err)
      {
        return console.error(err);
      } 
      else {
      // show the winners page with the data
      res.render('index', {
        title: 'Winners',
        page: 'winners',
        tournament : tournamentToEdit, displayName: UserDisplayName(req)
      })};
    });
};

export function ProcessFirstRoundAdvance(req : express.Request, res : express.Response, next : express.NextFunction) {
    // declaring and initializing parameter variables
    let id = req.params.id;
    let boutnum = req.params.boutnum;
    let winner = req.params.winner;
    let updateTournament=new Tournament();
    // find tournament with id    
    Tournament.findById(id, {}, {}, (err, tournament ) => {
         if (err)
         {
           return console.error(err);
         } 

         // create new tournament object to update according to winner
         switch(boutnum){
            case '1':
                updateTournament = new Tournament
                ({  "_id": id,
                    "Name" : tournament.Name,
                    "Owner" : {"Id" : tournament.Owner.Id, "DisplayName": tournament.Owner.DisplayName},
                    "isActive" : false,
                    "Participants" : tournament.Participants,
                    "SemiFinal" : [winner,tournament.SemiFinal[1],tournament.SemiFinal[2],tournament.SemiFinal[3]],
                    "Final" : tournament.Final,
                    "RunnerUp" : tournament.RunnerUp,
                    "First": tournament.First,
                    "Second": tournament.Second,
                    "Third": tournament.Third,
                    "Fourth": tournament.Fourth
                });
                break;
            case '2': 
                updateTournament = new Tournament
                ({  "_id": id,
                    "Name" : tournament.Name,
                    "Owner" : {"Id" : tournament.Owner.Id, "DisplayName": tournament.Owner.DisplayName},
                    "isActive" : false,
                    "Participants" : tournament.Participants,
                    "SemiFinal" : [tournament.SemiFinal[0],winner,tournament.SemiFinal[2],tournament.SemiFinal[3]],
                    "Final" : tournament.Final,
                    "RunnerUp" : tournament.RunnerUp,
                    "First": tournament.First,
                    "Second": tournament.Second,
                    "Third": tournament.Third,
                    "Fourth": tournament.Fourth
                });
                break;
            case '3':
                updateTournament = new Tournament
                ({  "_id": id,
                    "Name" : tournament.Name,
                    "Owner" : {"Id" : tournament.Owner.Id, "DisplayName": tournament.Owner.DisplayName},
                    "isActive" : false,
                    "Participants" : tournament.Participants,
                    "SemiFinal" : [tournament.SemiFinal[0],tournament.SemiFinal[1],winner,tournament.SemiFinal[3]],
                    "Final" : tournament.Final,
                    "RunnerUp" : tournament.RunnerUp,
                    "First": tournament.First,
                    "Second": tournament.Second,
                    "Third": tournament.Third,
                    "Fourth": tournament.Fourth
                });
                break;
            case '4':
                updateTournament = new Tournament
                ({  "_id": id,
                    "Name" : tournament.Name,
                    "Owner" : {"Id" : tournament.Owner.Id, "DisplayName": tournament.Owner.DisplayName},
                    "isActive" : false,
                    "Participants" : tournament.Participants,
                    "SemiFinal" : [tournament.SemiFinal[0],tournament.SemiFinal[1],tournament.SemiFinal[2],winner],
                    "Final" : tournament.Final,
                    "RunnerUp" : tournament.RunnerUp,
                    "First": tournament.First,
                    "Second": tournament.Second,
                    "Third": tournament.Third,
                    "Fourth": tournament.Fourth
                });
                break;
            }
            // insert the new tournament object into the database (runnerup collection)
            Tournament.updateOne({"_id" : id}, updateTournament, function(err : CallbackError)
            {
                if (err)
                {
                    console.error(err);
                    res.end(err);
                };
            })

        // edit successful
        res.redirect('/'+id+'/firstround');
    });
};

//SemiFinal Advancement
export function ProcessSemisAdvance(req : express.Request, res : express.Response, next : express.NextFunction) {
    // declaring and initializing parameter variables
    let id = req.params.id;
    let boutnum = req.params.boutnum;
    let winner = req.params.winner;
    let second = req.params.second;
    let updateTournament=new Tournament();
    // find tournament with id    
    Tournament.findById(id, {}, {}, (err, tournament ) => {
         if (err)
         {
           return console.error(err);
         }
         switch (boutnum){
            case '1':
                updateTournament = new Tournament
                ({  "_id": id,
                    "Name" : tournament.Name,
                    "Owner" : {"Id" : tournament.Owner.Id, "DisplayName": tournament.Owner.DisplayName},
                    "isActive" : false,
                    "Participants" : tournament.Participants,
                    "SemiFinal" : tournament.SemiFinal,
                    "Final" : [winner, tournament.Final[1]],
                    "RunnerUp" : [second, tournament.RunnerUp[1]],
                    "First": tournament.First,
                    "Second": tournament.Second,
                    "Third": tournament.Third,
                    "Fourth": tournament.Fourth
                });
                break;
            case '2':
                case '1':
                    updateTournament = new Tournament
                    ({  "_id": id,
                        "Name" : tournament.Name,
                        "Owner" : {"Id" : tournament.Owner.Id, "DisplayName": tournament.Owner.DisplayName},
                        "isActive" : false,
                        "Participants" : tournament.Participants,
                        "SemiFinal" : tournament.SemiFinal,
                        "Final" : [tournament.Final[0],winner],
                        "RunnerUp" : [tournament.RunnerUp[0],second],
                        "First": tournament.First,
                        "Second": tournament.Second,
                        "Third": tournament.Third,
                        "Fourth": tournament.Fourth
                    });
                break;
         }
         Tournament.updateOne({"_id" : id}, updateTournament, function(err : CallbackError)
            {
                if (err)
                {
                    console.error(err);
                    res.end(err);
                };
            })
         // edit successful
        res.redirect('/'+id+'/semifinal');
        })
}; 

    //RunnerUp Advancement
export function ProcessRunnerUpAdvance(req : express.Request, res : express.Response, next : express.NextFunction) {
    // declaring and initializing parameter variables
    let id = req.params.id;
    
    let winner = req.params.winner;
    let second = req.params.second;
    let updateTournament=new Tournament();
    // find tournament with id    
    Tournament.findById(id, {}, {}, (err, tournament ) => {
            if (err)
            {
            return console.error(err);
            }
        
            updateTournament = new Tournament
            ({  "_id": id,
                "Name" : tournament.Name,
                "Owner" : {"Id" : tournament.Owner.Id, "DisplayName": tournament.Owner.DisplayName},
                "isActive" : false,
                "Participants" : tournament.Participants,
                "SemiFinal" : tournament.SemiFinal,
                "Final" : tournament.Final,
                "RunnerUp" : tournament.RunnerUp,
                "First": tournament.First,
                "Second": tournament.Second,
                "Third": winner,
                "Fourth": second
            });
            
            Tournament.updateOne({"_id" : id}, updateTournament, function(err : CallbackError)
            {
                if (err)
                {
                    console.error(err);
                    res.end(err);
                };
            })
            // edit successful
        res.redirect('/'+id+'/runnerup');
        })
    }; 

     //RunnerUp Advancement
export function ProcessFinalAdvance(req : express.Request, res : express.Response, next : express.NextFunction) {
    // declaring and initializing parameter variables
    let id = req.params.id;
    
    let winner = req.params.winner;
    let second = req.params.second;
    let updateTournament=new Tournament();
    // find tournament with id    
    Tournament.findById(id, {}, {}, (err, tournament ) => {
            if (err)
            {
            return console.error(err);
            }
        
            updateTournament = new Tournament
            ({  "_id": id,
                "Name" : tournament.Name,
                "Owner" : {"Id" : tournament.Owner.Id, "DisplayName": tournament.Owner.DisplayName},
                "isActive" : false,
                "Participants" : tournament.Participants,
                "SemiFinal" : tournament.SemiFinal,
                "Final" : tournament.Final,
                "RunnerUp" : tournament.RunnerUp,
                "First": winner,
                "Second": second,
                "Third": tournament.third,
                "Fourth": tournament.fourth
            });
            
            Tournament.updateOne({"_id" : id}, updateTournament, function(err : CallbackError)
            {
                if (err)
                {
                    console.error(err);
                    res.end(err);
                };
            })
            // edit successful
        res.redirect('/'+id+'/final');
        })
    };