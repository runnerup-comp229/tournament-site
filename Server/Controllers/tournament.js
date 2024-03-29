"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessFinalAdvance = exports.ProcessRunnerUpAdvance = exports.ProcessSemisAdvance = exports.ProcessFirstRoundAdvance = exports.DisplayWinnersPage = exports.ProcessManagePage = exports.DisplayManagePage = exports.DisplayFinalPage = exports.DisplayRunnerUpPage = exports.DisplaySemiFinalPage = exports.ProcessDeletePage = exports.ProcessEditPage = exports.DisplayEditPage = exports.DisplayFirstRound = exports.DisplayCurrentRound = exports.ProcessAddPage = exports.DisplayAddPage = exports.RedirectLandingPage = exports.DisplayMyTournamentPage = exports.DisplayLandingPage = void 0;
const tournament_1 = __importDefault(require("../Models/tournament"));
const Util_1 = require("../Util");
function DisplayLandingPage(req, res, next) {
    tournament_1.default.find(function (err, tournaments) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Home', page: 'home', tournament: tournaments, displayName: (0, Util_1.UserDisplayName)(req), userId: (0, Util_1.getUserId)(req) });
    });
}
exports.DisplayLandingPage = DisplayLandingPage;
;
function DisplayMyTournamentPage(req, res, next) {
    tournament_1.default.find({ "Owner.Id": (0, Util_1.getUserId)(req) }, function (err, tournaments) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'My Tournaments', page: 'mytournaments', tournament: tournaments, displayName: (0, Util_1.UserDisplayName)(req), userId: (0, Util_1.getUserId)(req) });
    });
}
exports.DisplayMyTournamentPage = DisplayMyTournamentPage;
;
function RedirectLandingPage(req, res, next) {
    res.redirect('/login');
}
exports.RedirectLandingPage = RedirectLandingPage;
;
function DisplayAddPage(req, res, next) {
    res.render('index', { title: 'Add', page: 'edit', tournament: '', displayName: (0, Util_1.UserDisplayName)(req), userId: (0, Util_1.getUserId)(req) });
}
exports.DisplayAddPage = DisplayAddPage;
function ProcessAddPage(req, res, next) {
    let uid = req.params.uid;
    let newTournament = new tournament_1.default({
        "Name": req.body.name,
        "Owner": { "Id": (0, Util_1.getUserId)(req), "DisplayName": (0, Util_1.UserDisplayName)(req) },
        "isActive": true,
        "Participants": [req.body.team1, req.body.team2, req.body.team3, req.body.team4, req.body.team5, req.body.team6, req.body.team7, req.body.team8],
        "SemiFinal": ["", "", "", ""],
        "Final": ["", ""],
        "RunnerUp": ["", ""],
        "First": "",
        "Second": "",
        "Third": "",
        "Fourth": ""
    });
    tournament_1.default.create(newTournament, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        ;
        res.redirect('/mytournaments/' + uid);
    });
}
exports.ProcessAddPage = ProcessAddPage;
;
function DisplayCurrentRound(req, res, next) {
    let id = req.params.id;
    tournament_1.default.findById(id, {}, {}, function (err, tournamentToView) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        if (tournamentToView.First != "" && tournamentToView.Second != "" && tournamentToView.Third != "" && tournamentToView.Fourth != "") {
            res.redirect('/' + tournamentToView._id + '/winners');
        }
        else if (tournamentToView.Final[0] != "" && tournamentToView.Final[1] != "") {
            res.redirect('/' + tournamentToView._id + '/final');
        }
        else if (tournamentToView.RunnerUp[0] != "" && tournamentToView.RunnerUp[1] != "") {
            res.redirect('/' + tournamentToView._id + '/runnerup');
        }
        else if (tournamentToView.SemiFinal[0] != "" && tournamentToView.SemiFinal[1] != "" && tournamentToView.SemiFinal[2] != "" && tournamentToView.SemiFinal[3] != "") {
            res.redirect('/' + tournamentToView._id + '/semifinal');
        }
        else {
            res.redirect('/' + tournamentToView._id + '/firstround');
        }
    });
}
exports.DisplayCurrentRound = DisplayCurrentRound;
function DisplayFirstRound(req, res, next) {
    let id = req.params.id;
    tournament_1.default.findById(id, {}, {}, function (err, tournamentToView) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'First-round', page: "tournament-firstround", messages: req.flash('advancementMessage'), tournament: tournamentToView, displayName: (0, Util_1.UserDisplayName)(req), userId: (0, Util_1.getUserId)(req) });
    });
}
exports.DisplayFirstRound = DisplayFirstRound;
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
                tournament: tournamentToEdit, displayName: (0, Util_1.UserDisplayName)(req), userId: (0, Util_1.getUserId)(req)
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
            "Owner": { "Id": (0, Util_1.getUserId)(req), "DisplayName": (0, Util_1.UserDisplayName)(req) },
            "isActive": true,
            "Participants": [tournament.Participants[0], tournament.Participants[1], tournament.Participants[2], tournament.Participants[3], tournament.Participants[4], tournament.Participants[5], tournament.Participants[6], tournament.Participants[7]],
            "SemiFinal": [tournament.SemiFinal[0], tournament.SemiFinal[1], tournament.SemiFinal[2], tournament.SemiFinal[3]],
            "Final": [tournament.Final[0], tournament.Final[1]],
            "RunnerUp": [tournament.RunnerUp[0], tournament.RunnerUp[1]],
            "First": tournament.First,
            "Second": tournament.Second,
            "Third": tournament.Third,
            "Fourth": tournament.Fourth
        });
        tournament_1.default.updateOne({ "_id": id }, updateTournament, function (err) {
            if (err) {
                console.error(err);
                res.end(err);
            }
            ;
            res.redirect('/mytournaments/' + tournament.Owner.Id);
        });
    });
}
exports.ProcessEditPage = ProcessEditPage;
;
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    let uid = req.params.uid;
    tournament_1.default.remove({ "_id": id }, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        ;
        res.redirect('/mytournaments/' + uid);
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
        res.render('index', { title: 'Semi-Final', page: 'semifinal', messages: req.flash('advancementMessageSemi'), tournament: tournamentToView, displayName: (0, Util_1.UserDisplayName)(req), userId: (0, Util_1.getUserId)(req) });
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
        res.render('index', { title: 'Runner-Up', page: 'runnerup', messages: req.flash('advancementMessageRunner'), tournament: tournamentToView, displayName: (0, Util_1.UserDisplayName)(req), userId: (0, Util_1.getUserId)(req) });
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
        res.render('index', { title: 'Final', page: 'final', messages: req.flash('advancementMessageFinal'), tournament: tournamentToView, displayName: (0, Util_1.UserDisplayName)(req), userId: (0, Util_1.getUserId)(req) });
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
                tournament: tournamentToEdit, displayName: (0, Util_1.UserDisplayName)(req), userId: (0, Util_1.getUserId)(req)
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
        if (req.body.first == "" || req.body.second == "" || req.body.third == "" || req.body.fourth == "") {
            let updateTournament = new tournament_1.default({ "_id": id,
                "Name": tournament.Name,
                "Owner": { "Id": tournament.Owner.Id, "DisplayName": tournament.Owner.DisplayName },
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
                res.redirect('/mytournaments/' + tournament.Owner.Id);
            });
        }
        else {
            let updateTournament = new tournament_1.default({ "_id": id,
                "Name": tournament.Name,
                "Owner": { "Id": tournament.Owner.Id, "DisplayName": tournament.Owner.DisplayName },
                "isActive": false,
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
                res.redirect('/mytournaments/' + tournament.Owner.Id);
            });
        }
        ;
    });
}
exports.ProcessManagePage = ProcessManagePage;
;
function DisplayWinnersPage(req, res, next) {
    let id = req.params.id;
    tournament_1.default.findById(id, {}, {}, (err, tournamentToEdit) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.render('index', {
                title: 'Winners',
                page: 'winners',
                tournament: tournamentToEdit, displayName: (0, Util_1.UserDisplayName)(req), userId: (0, Util_1.getUserId)(req)
            });
        }
        ;
    });
}
exports.DisplayWinnersPage = DisplayWinnersPage;
;
function ProcessFirstRoundAdvance(req, res, next) {
    let id = req.params.id;
    let boutnum = req.params.boutnum;
    let winner = req.params.winner;
    let updateTournament = new tournament_1.default();
    tournament_1.default.findById(id, {}, {}, (err, tournament) => {
        if (err) {
            return console.error(err);
        }
        if (tournament.Owner.Id == (0, Util_1.getUserId)(req)) {
            switch (boutnum) {
                case '1':
                    if (tournament.Final[0] == "") {
                        updateTournament = new tournament_1.default({ "_id": id,
                            "Name": tournament.Name,
                            "Owner": { "Id": tournament.Owner.Id, "DisplayName": tournament.Owner.DisplayName },
                            "isActive": false,
                            "Participants": tournament.Participants,
                            "SemiFinal": [winner, tournament.SemiFinal[1], tournament.SemiFinal[2], tournament.SemiFinal[3]],
                            "Final": tournament.Final,
                            "RunnerUp": tournament.RunnerUp,
                            "First": tournament.First,
                            "Second": tournament.Second,
                            "Third": tournament.Third,
                            "Fourth": tournament.Fourth
                        });
                    }
                    else {
                        req.flash('advancementMessage', 'Next Round Completed.');
                    }
                    break;
                case '2':
                    if (tournament.Final[0] == "") {
                        updateTournament = new tournament_1.default({ "_id": id,
                            "Name": tournament.Name,
                            "Owner": { "Id": tournament.Owner.Id, "DisplayName": tournament.Owner.DisplayName },
                            "isActive": false,
                            "Participants": tournament.Participants,
                            "SemiFinal": [tournament.SemiFinal[0], winner, tournament.SemiFinal[2], tournament.SemiFinal[3]],
                            "Final": tournament.Final,
                            "RunnerUp": tournament.RunnerUp,
                            "First": tournament.First,
                            "Second": tournament.Second,
                            "Third": tournament.Third,
                            "Fourth": tournament.Fourth
                        });
                    }
                    else {
                        req.flash('advancementMessage', 'Next Round Completed.');
                    }
                    break;
                case '3':
                    if (tournament.Final[1] == "") {
                        updateTournament = new tournament_1.default({ "_id": id,
                            "Name": tournament.Name,
                            "Owner": { "Id": tournament.Owner.Id, "DisplayName": tournament.Owner.DisplayName },
                            "isActive": false,
                            "Participants": tournament.Participants,
                            "SemiFinal": [tournament.SemiFinal[0], tournament.SemiFinal[1], winner, tournament.SemiFinal[3]],
                            "Final": tournament.Final,
                            "RunnerUp": tournament.RunnerUp,
                            "First": tournament.First,
                            "Second": tournament.Second,
                            "Third": tournament.Third,
                            "Fourth": tournament.Fourth
                        });
                    }
                    else {
                        req.flash('advancementMessage', 'Next Round Completed.');
                    }
                    break;
                case '4':
                    if (tournament.Final[1] == "") {
                        updateTournament = new tournament_1.default({ "_id": id,
                            "Name": tournament.Name,
                            "Owner": { "Id": tournament.Owner.Id, "DisplayName": tournament.Owner.DisplayName },
                            "isActive": false,
                            "Participants": tournament.Participants,
                            "SemiFinal": [tournament.SemiFinal[0], tournament.SemiFinal[1], tournament.SemiFinal[2], winner],
                            "Final": tournament.Final,
                            "RunnerUp": tournament.RunnerUp,
                            "First": tournament.First,
                            "Second": tournament.Second,
                            "Third": tournament.Third,
                            "Fourth": tournament.Fourth
                        });
                    }
                    else {
                        req.flash('advancementMessage', 'Next Round Completed.');
                    }
                    break;
            }
            tournament_1.default.updateOne({ "_id": id }, updateTournament, function (err) {
                if (err) {
                    console.error(err);
                    res.end(err);
                }
                ;
            });
            res.redirect('/' + id + '/firstround');
        }
        else {
            req.flash('advancementMessage', 'Only Tournament Owner May Advance Teams');
            res.redirect('/' + id + '/firstround');
        }
        ;
    });
}
exports.ProcessFirstRoundAdvance = ProcessFirstRoundAdvance;
;
function ProcessSemisAdvance(req, res, next) {
    let id = req.params.id;
    let boutnum = req.params.boutnum;
    let winner = req.params.winner;
    let second = req.params.second;
    let updateTournament = new tournament_1.default();
    tournament_1.default.findById(id, {}, {}, (err, tournament) => {
        if (err) {
            return console.error(err);
        }
        if (tournament.Owner.Id == (0, Util_1.getUserId)(req)) {
            if (tournament.Third == "" && tournament.First == "") {
                switch (boutnum) {
                    case '1':
                        updateTournament = new tournament_1.default({ "_id": id,
                            "Name": tournament.Name,
                            "Owner": { "Id": tournament.Owner.Id, "DisplayName": tournament.Owner.DisplayName },
                            "isActive": false,
                            "Participants": tournament.Participants,
                            "SemiFinal": tournament.SemiFinal,
                            "Final": [winner, tournament.Final[1]],
                            "RunnerUp": [second, tournament.RunnerUp[1]],
                            "First": tournament.First,
                            "Second": tournament.Second,
                            "Third": tournament.Third,
                            "Fourth": tournament.Fourth
                        });
                        break;
                    case '2':
                    case '1':
                        updateTournament = new tournament_1.default({ "_id": id,
                            "Name": tournament.Name,
                            "Owner": { "Id": tournament.Owner.Id, "DisplayName": tournament.Owner.DisplayName },
                            "isActive": false,
                            "Participants": tournament.Participants,
                            "SemiFinal": tournament.SemiFinal,
                            "Final": [tournament.Final[0], winner],
                            "RunnerUp": [tournament.RunnerUp[0], second],
                            "First": tournament.First,
                            "Second": tournament.Second,
                            "Third": tournament.Third,
                            "Fourth": tournament.Fourth
                        });
                        break;
                }
                tournament_1.default.updateOne({ "_id": id }, updateTournament, function (err) {
                    if (err) {
                        console.error(err);
                        res.end(err);
                    }
                    ;
                });
                res.redirect('/' + id + '/semifinal');
            }
            else {
                req.flash('advancementMessageSemi', 'Next Round Completed.');
            }
        }
        else {
            req.flash('advancementMessageSemi', 'Only Owner May Advance Teams');
            res.redirect('/' + id + '/semifinal');
        }
        ;
    });
}
exports.ProcessSemisAdvance = ProcessSemisAdvance;
;
function ProcessRunnerUpAdvance(req, res, next) {
    let id = req.params.id;
    let winner = req.params.winner;
    let second = req.params.second;
    let updateTournament = new tournament_1.default();
    tournament_1.default.findById(id, {}, {}, (err, tournament) => {
        if (err) {
            return console.error(err);
        }
        if (tournament.Owner.Id == (0, Util_1.getUserId)(req)) {
            updateTournament = new tournament_1.default({ "_id": id,
                "Name": tournament.Name,
                "Owner": { "Id": tournament.Owner.Id, "DisplayName": tournament.Owner.DisplayName },
                "isActive": false,
                "Participants": tournament.Participants,
                "SemiFinal": tournament.SemiFinal,
                "Final": tournament.Final,
                "RunnerUp": tournament.RunnerUp,
                "First": tournament.First,
                "Second": tournament.Second,
                "Third": winner,
                "Fourth": second
            });
            tournament_1.default.updateOne({ "_id": id }, updateTournament, function (err) {
                if (err) {
                    console.error(err);
                    res.end(err);
                }
                ;
            });
            res.redirect('/' + id + '/runnerup');
        }
        else {
            req.flash('advancementMessageRunner', 'Only Owner May Advance Teams');
            res.redirect('/' + id + '/runnerup');
        }
        ;
    });
}
exports.ProcessRunnerUpAdvance = ProcessRunnerUpAdvance;
;
function ProcessFinalAdvance(req, res, next) {
    let id = req.params.id;
    let winner = req.params.winner;
    let second = req.params.second;
    let updateTournament = new tournament_1.default();
    tournament_1.default.findById(id, {}, {}, (err, tournament) => {
        if (err) {
            return console.error(err);
        }
        if (tournament.Owner.Id == (0, Util_1.getUserId)(req)) {
            updateTournament = new tournament_1.default({ "_id": id,
                "Name": tournament.Name,
                "Owner": { "Id": tournament.Owner.Id, "DisplayName": tournament.Owner.DisplayName },
                "isActive": false,
                "Participants": tournament.Participants,
                "SemiFinal": tournament.SemiFinal,
                "Final": tournament.Final,
                "RunnerUp": tournament.RunnerUp,
                "First": winner,
                "Second": second,
                "Third": tournament.third,
                "Fourth": tournament.fourth
            });
            tournament_1.default.updateOne({ "_id": id }, updateTournament, function (err) {
                if (err) {
                    console.error(err);
                    res.end(err);
                }
                ;
            });
            res.redirect('/' + id + '/final');
        }
        else {
            req.flash('advancementMessageFinal', 'Only Owner May Advance Teams');
            res.redirect('/' + id + '/final');
        }
        ;
    });
}
exports.ProcessFinalAdvance = ProcessFinalAdvance;
;
//# sourceMappingURL=tournament.js.map