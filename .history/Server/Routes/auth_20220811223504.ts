
import express from 'express';
const router = express.Router();

// import the controller module
import { DisplayLoginPage,  DisplayRegisterPage, DisplayUpdatePage,  ProcessLoginPage, ProcessLogoutPage, ProcessRegisterPage, ProcessUpdatePage } from "../Controllers/auth";
import { AuthGuard } from '../Util';
import { registerValidateCheck , validateRegister, updateValidateCheck, validateUpdate} from '../Util/validation';

/* Display home page. */
router.get('/login', DisplayLoginPage);

/* Display home page. */
router.get('/register', DisplayRegisterPage);

/* Display update page. */
router.get('/update/:id', AuthGuard, DisplayUpdatePage);

/* Process update page. */
router.post('/update/:id', AuthGuard, updateValidateCheck,validateUpdate, ProcessUpdatePage);

/* Display add page. */
router.post('/login', ProcessLoginPage);

/* Process add page. */
router.post('/register', registerValidateCheck, validateRegister, ProcessRegisterPage);

/* Display First Round page*/
router.get('/logout', ProcessLogoutPage);


export default router;