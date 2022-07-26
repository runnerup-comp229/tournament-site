
import express from 'express';
const router = express.Router();

// import the controller module
import { DisplayLoginPage,  DisplayRegisterPage,  ProcessLoginPage, ProcessLogoutPage, ProcessRegisterPage } from "../Controllers/auth";

/* Display home page. */
router.get('/login', (req : express.Request, res : express.Response, next : express.NextFunction) => {
    res.render('index', {
        title: 'Winners',
        page: 'winners',
        tournament : ""
      });
});

/* Display home page. */
router.get('/register', DisplayRegisterPage);

/* Display add page. */
router.post('/login', ProcessLoginPage);

/* Process add page. */
router.post('/register', ProcessRegisterPage);

/* Display First Round page*/
router.get('/logout', ProcessLogoutPage);


export default router;