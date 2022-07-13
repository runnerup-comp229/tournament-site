/* 
Filename: Index routes
Name: Fahmid Ovi
Student ID: 301216822
*/

import express from 'express';
const router = express.Router();

// import the controller module
import {DisplayHomePage , DisplayAboutPage, DisplayContactPage, DisplayServicesPage, DisplayProjectsPage} from "../Controllers/index";

/* Display home page. */
router.get('/', DisplayHomePage);

/* Display home page. */
router.get('/home', DisplayHomePage);

/* Display about page. */
router.get('/about', DisplayAboutPage);

/* Display projects page. */
router.get('/projects', DisplayProjectsPage);

/* Display services page. */
router.get('/services', DisplayServicesPage);

/* Display contact page. */
router.get('/contact', DisplayContactPage);

export default router;