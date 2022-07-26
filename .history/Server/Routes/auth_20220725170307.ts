
import express from 'express';
const router = express.Router();
import bodyParser from 'body-parser';
import {check, validationResult} from 'express-validator';


const urlencodedParser = bodyParser.urlencoded({extended: false});


/* Display login page. */
router.get('/login', DisplayLoginPage);