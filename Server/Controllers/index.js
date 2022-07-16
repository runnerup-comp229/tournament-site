"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayHomePage = void 0;
const tournament_1 = __importDefault(require("../Models/tournament"));
function DisplayHomePage(req, res, next) {
    tournament_1.default.find(function (err, tournaments) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Home', page: 'home', tournament: tournaments });
    });
}
exports.DisplayHomePage = DisplayHomePage;
;
//# sourceMappingURL=index.js.map