"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessManagePage = exports.DisplayManagePage = exports.DisplayFinalPage = exports.DisplayRunnerUpPage = exports.DisplaySemiFinalPage = exports.ProcessDeletePage = exports.ProcessEditPage = exports.DisplayEditPage = exports.DisplayFirstRoundPage = exports.ProcessAddPage = exports.DisplayAddPage = exports.DisplayLandingPage = void 0;
const tournament_1 = __importDefault(require("../Models/tournament"));
function DisplayLandingPage(req, res, next) {
    tournament_1.default.find(function (err, tournaments) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Home', page: 'home', tournament: tournaments });
    });
}
exports.DisplayLandingPage = DisplayLandingPage;
;
function DisplayAddPage(req, res, next) {
    res.render('index', { title: 'Add', page: 'edit', tournament: '' });
}
exports.DisplayAddPage = DisplayAddPage;
function ProcessAddPage(req, res, next) {
    let newTournament = new tournament_1.default({
        "Name": req.body.name,
        "Owner": req.body.owner,
        "isActive": true,
        "Participants": [req.body.team1, req.body.team2, req.body.team3, req.body.team4, req.body.team5, req.body.team6, req.body.team7, req.body.team8]
    });
    tournament_1.default.create(newTournament, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        ;
        res.redirect('/home');
    });
}
exports.ProcessAddPage = ProcessAddPage;
;
function DisplayFirstRoundPage(req, res, next) {
    let id = req.params.id;
    tournament_1.default.findById(id, {}, {}, function (err, tournamentToView) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'First Round', page: 'tournament-firstround', tournament: tournamentToView });
    });
}
exports.DisplayFirstRoundPage = DisplayFirstRoundPage;
function DisplayEditPage(req, res, next) {
    let id = req.params.id;
    tournament_1.default.findById(id, {}, {}, (err, tournamentToEdit) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.render('index', {
                title: 'Edit',
                page: 'edit',
                tournament: tournamentToEdit
            });
        }
        ;
    });
}
exports.DisplayEditPage = DisplayEditPage;
;
function ProcessEditPage(req, res, next) {
    let id = req.params.id;
    tournament_1.default.findById(id, {}, {}, (err, tournament) => {
        if (err) {
            return console.error(err);
        }
        let updateTournament = new tournament_1.default({ "_id": id,
            "Name": req.body.name,
            "Owner": req.body.owner,
            "isActive": true,
            "Participants": [tournament.Participants[0], tournament.Participants[1], tournament.Participants[2], tournament.Participants[3], tournament.Participants[4], tournament.Participants[5], tournament.Participants[6], tournament.Participants[7]]
        });
        tournament_1.default.updateOne({ "_id": id }, updateTournament, function (err) {
            if (err) {
                console.error(err);
                res.end(err);
            }
            ;
            res.redirect('/home');
        });
    });
}
exports.ProcessEditPage = ProcessEditPage;
;
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    tournament_1.default.remove({ "_id": id }, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        ;
        res.redirect('/home');
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
;
function DisplaySemiFinalPage(req, res, next) {
    let id = req.params.id;
    tournament_1.default.findById(id, {}, {}, function (err, tournamentToView) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'First Round', page: 'semifinal', tournament: tournamentToView });
    });
}
exports.DisplaySemiFinalPage = DisplaySemiFinalPage;
;
function DisplayRunnerUpPage(req, res, next) {
    let id = req.params.id;
    tournament_1.default.findById(id, {}, {}, function (err, tournamentToView) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'First Round', page: 'runnerup', tournament: tournamentToView });
    });
}
exports.DisplayRunnerUpPage = DisplayRunnerUpPage;
;
function DisplayFinalPage(req, res, next) {
    let id = req.params.id;
    tournament_1.default.findById(id, {}, {}, function (err, tournamentToView) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'First Round', page: 'final', tournament: tournamentToView });
    });
}
exports.DisplayFinalPage = DisplayFinalPage;
;
function DisplayManagePage(req, res, next) {
    let id = req.params.id;
    tournament_1.default.findById(id, {}, {}, (err, tournamentToEdit) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.render('index', {
                title: 'Manage',
                page: 'manage',
                tournament: tournamentToEdit
            });
        }
        ;
    });
}
exports.DisplayManagePage = DisplayManagePage;
;
function ProcessManagePage(req, res, next) {
    let id = req.params.id;
    tournament_1.default.findById(id, {}, {}, (err, tournament) => {
        if (err) {
            return console.error(err);
        }
        let updateTournament = new tournament_1.default({ "_id": id,
            "Name": tournament.Name,
            "Owner": tournament.Owner,
            "isActive": true,
            "Participants": [req.body.team1, req.body.team2, req.body.team3, req.body.team4, req.body.team5, req.body.team6, req.body.team7, req.body.team8],
            "SemiFinal": [req.body.sfteam1, req.body.sfteam2, req.body.sfteam3, req.body.sfteam4],
            "Final": [req.body.fteam1, req.body.fteam2],
            "RunnerUp": [req.body.ruteam1, req.body.ruteam2],
            "First": req.body.first,
            "Second": req.body.second,
            "Third": req.body.third,
            "Fourth": req.body.fourth
        });
        tournament_1.default.updateOne({ "_id": id }, updateTournament, function (err) {
            if (err) {
                console.error(err);
                res.end(err);
            }
            ;
            res.redirect('/home');
        });
    });
}
exports.ProcessManagePage = ProcessManagePage;
;
//# sourceMappingURL=tournament.js.map