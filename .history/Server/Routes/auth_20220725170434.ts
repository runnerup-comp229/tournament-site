
import express from 'express';
const router = express.Router();
import bodyParser from 'body-parser';
import {check, validationResult} from 'express-validator';


const urlencodedParser = bodyParser.urlencoded({extended: false});


/* Display login page. */
router.get('/login', function(req : express.Request, res : express.Response, next : express.NextFunction) 
{
    if (!req.user)
    {
        return res.render('index', {title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req)});
    }
    return res.redirect('/contact-list');
});


export default router;