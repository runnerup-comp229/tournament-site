import express from 'express';
const router = express.Router();

// import the controller module
import {DisplayAddPage, DisplayEditPage, DisplayFinalPage, DisplayCurrentRound, DisplayLandingPage, DisplayManagePage, DisplayRunnerUpPage, DisplaySemiFinalPage, DisplayWinnersPage, ProcessAddPage, ProcessDeletePage, ProcessEditPage, ProcessManagePage, DisplayFirstRound, ProcessFirstRoundAdvance, ProcessSemisAdvance} from "../Controllers/tournament";


/* Display home page. */
router.get('/', DisplayLandingPage);

/* Display home page. */
router.get('/home', DisplayLandingPage);

/* Display add page. */
router.get('/add', DisplayAddPage);

/* Process add page. */
router.post('/add', ProcessAddPage);

/* Show current round page*/
router.get('/view/:id', DisplayCurrentRound);

/* Display First Round page*/
router.get('/:id/firstround', DisplayFirstRound);

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
router.get('/manage/:id', DisplayManagePage);

/* Process manage page */
router.post('/manage/:id', ProcessManagePage);

/* Display winners page */
router.get('/:id/winners', DisplayWinnersPage);

//process round1 advancement
router.get('/:id/firstround/:boutnum/:winner', ProcessFirstRoundAdvance);

//process semifinal advancement
router.get('/:id/semifinal/:boutnum/:winner/:second',ProcessSemisAdvance);


export default router;


