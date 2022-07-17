"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const tournament_1 = __importDefault(require("../Models/tournament"));
const tournament_2 = require("../Controllers/tournament");
router.get('/', tournament_2.DisplayLandingPage);
router.get('/home', tournament_2.DisplayLandingPage);
router.get('/add', tournament_2.DisplayAddPage);
router.post('/add', tournament_2.ProcessAddPage);
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    tournament_1.default.findById(id, {}, {}, function (err, tournamentToView) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'First Round', page: 'tournament-firstround', tournament: tournamentToView });
    });
});
router.get('/edit/:id', (req, res, next) => {
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
});
router.post('/edit/:id', (req, res, next) => {
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
});
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    tournament_1.default.remove({ "_id": id }, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        ;
        res.redirect('/home');
    });
});
router.get('/:id/semifinal', (req, res, next) => {
    let id = req.params.id;
    tournament_1.default.findById(id, {}, {}, function (err, tournamentToView) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'First Round', page: 'semifinal', tournament: tournamentToView });
    });
});
router.get('/:id/runnerup', (req, res, next) => {
    let id = req.params.id;
    tournament_1.default.findById(id, {}, {}, function (err, tournamentToView) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'First Round', page: 'runnerup', tournament: tournamentToView });
    });
});
router.get('/:id/final', (req, res, next) => {
    let id = req.params.id;
    tournament_1.default.findById(id, {}, {}, function (err, tournamentToView) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'First Round', page: 'final', tournament: tournamentToView });
    });
});
router.get('/manage/:id', (req, res, next) => {
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
});
router.post('/manage/:id', (req, res, next) => {
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
});
exports.default = router;
//# sourceMappingURL=tournament.js.map