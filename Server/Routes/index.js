"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const tournament_1 = __importDefault(require("../Models/tournament"));
const index_1 = require("../Controllers/index");
router.get('/', index_1.DisplayHomePage);
router.get('/home', index_1.DisplayHomePage);
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
exports.default = router;
//# sourceMappingURL=index.js.map