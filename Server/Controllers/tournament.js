"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessAddPage = exports.DisplayAddPage = exports.DisplayLandingPage = void 0;
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
//# sourceMappingURL=tournament.js.map