import express from 'express';
const router = express.Router();

// import the controller module
import {DisplayAddPage, DisplayEditPage, DisplayFinalPage, DisplayCurrentRound, DisplayLandingPage, DisplayManagePage, DisplayRunnerUpPage, DisplaySemiFinalPage, DisplayWinnersPage, ProcessAddPage, ProcessDeletePage, ProcessEditPage, ProcessManagePage, DisplayFirstRound, ProcessFirstRoundAdvance, ProcessSemisAdvance, ProcessRunnerUpAdvance, ProcessFinalAdvance, DisplayMyTournamentPage} from "../Controllers/tournament";
import { AuthGuard } from '../Util';


/* Display home page. */
router.get('/', DisplayLandingPage);

/* Display home page. */
router.get('/home', DisplayLandingPage);

/* Display my tournaments page */
router.get('/:id/mytournaments',AuthGuard, DisplayMyTournamentPage);

/* Display add page. */
router.get('/add',AuthGuard, DisplayAddPage);

/* Process add page. */
router.post('/add',AuthGuard, ProcessAddPage);

/* Show current round page*/
router.get('/view/:id', DisplayCurrentRound);

/* Display First Round page*/
router.get('/:id/firstround', DisplayFirstRound);

/* Display Edit page */
router.get('/edit/:id',AuthGuard, DisplayEditPage);

/* Process Edit page */
router.post('/edit/:id',AuthGuard, ProcessEditPage);

/* Process delete page */
router.get('/delete/:id',AuthGuard, ProcessDeletePage);

/* Display semi final page*/
router.get('/:id/semifinal', DisplaySemiFinalPage);

/* Display runner up page*/
router.get('/:id/runnerup', DisplayRunnerUpPage);

/* Display final */
router.get('/:id/final', DisplayFinalPage);

/* Display manage page */
router.get('/manage/:id',AuthGuard, DisplayManagePage);

/* Process manage page */
router.post('/manage/:id',AuthGuard, ProcessManagePage);

/* Display winners page */
router.get('/:id/winners', DisplayWinnersPage);

//process round1 advancement
router.get('/:id/firstround/:boutnum/:winner', ProcessFirstRoundAdvance);

//process semifinal advancement
router.get('/:id/semifinal/:boutnum/:winner/:second',ProcessSemisAdvance);

//process  runner up advancement
router.get('/:id/runnerup/:winner/:second',ProcessRunnerUpAdvance);

//process  final advancement
router.get('/:id/final/:winner/:second',ProcessFinalAdvance);

export default router;


