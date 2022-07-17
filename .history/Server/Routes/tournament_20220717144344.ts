import express from 'express';
const router = express.Router();

import Tournament from '../Models/tournament';

// import the controller module
import {DisplayAddPage, DisplayEditPage, DisplayFinalPage, DisplayFirstRoundPage, DisplayLandingPage, DisplayManagePage, DisplayRunnerUpPage, DisplaySemiFinalPage, ProcessAddPage, ProcessDeletePage, ProcessEditPage, ProcessManagePage } from "../Controllers/tournament";
import { CallbackError } from 'mongoose';

/* Display home page. */
router.get('/', DisplayLandingPage);

/* Display home page. */
router.get('/home', DisplayLandingPage);

/* Display add page. */
router.get('/add', DisplayAddPage);

/* Process add page. */
router.post('/add', ProcessAddPage);

/* Display First Round page*/
router.get('/:id', DisplayFirstRoundPage);

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

/* Process manage page */
router.get('/winners/:id', DisplayWinnersPage);

export default router;