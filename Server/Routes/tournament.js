"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const tournament_1 = require("../Controllers/tournament");
router.get('/', tournament_1.DisplayLandingPage);
router.get('/home', tournament_1.DisplayLandingPage);
router.get('/add', tournament_1.DisplayAddPage);
router.post('/add', tournament_1.ProcessAddPage);
router.get('/:id', tournament_1.DisplayFirstRoundPage);
router.get('/edit/:id', tournament_1.DisplayEditPage);
router.post('/edit/:id', tournament_1.ProcessEditPage);
router.get('/delete/:id', tournament_1.ProcessDeletePage);
router.get('/:id/semifinal', tournament_1.DisplaySemiFinalPage);
router.get('/:id/runnerup', tournament_1.DisplayRunnerUpPage);
router.get('/:id/final', tournament_1.DisplayFinalPage);
router.get('/manage/:id', tournament_1.DisplayManagePage);
router.post('/manage/:id', tournament_1.ProcessManagePage);
exports.default = router;
//# sourceMappingURL=tournament.js.map