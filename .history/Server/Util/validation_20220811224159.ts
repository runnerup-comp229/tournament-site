// import supporting module for validation
import express from 'express';
import bodyParser from 'body-parser';
import {check, validationResult} from 'express-validator';
import { getUserId, UserDisplayName } from './index';
import user from '../Models/user';

// schema for validation
export const registerValidateCheck = [
    check('firstName', 'First name cannot be blanked')
    .notEmpty(),
    check('emailAddress', 'Enter a valid email address')
    .exists()
    .notEmpty()
    .withMessage("Email cannot be blanked")
    .isEmail()
    .normalizeEmail(),
    check('password', 'Password must be 5 chars long and must contain a number')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('Password must contain a number')
    .custom((value, { req  }) => {
        if (value != req.body.confirmPassword) {
          throw new Error('Password confirmation is incorrect');
        }
        return true;
      })
]

// schema for validation
export const updateValidateCheck = [
  check('firstName', 'First name cannot be blanked')
  .notEmpty(),
  check('emailAddress', 'Enter a valid email address')
  .exists()
  .notEmpty()
  .withMessage("Email cannot be blanked")
  .isEmail()
  .normalizeEmail(),
  check('confirmPassword', 'Password must be 5 chars long and must contain a number')
  .optional()
  .custom((value, { req  }) => {
    if (value != "") {
      check('confirmPassword', 'Password must be 5 chars long and must contain a number')
      .isLength({ min: 5 })
  .withMessage('Password must be at least 5 chars long')
  .matches(/\d/)
  .withMessage('Password must contain a number')
    }
    return true;
  })
]

// validate schema
export function validateRegister(req: express.Request,res: express.Response, next : express.NextFunction) 
{
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        const err = errors.array();
        console.log(err);
        return res.render('index', {title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: UserDisplayName(req), err, user : '', userId : getUserId(req)  });
    }
    next();
}

// validate schema
export function validateUpdate(req: express.Request,res: express.Response, next : express.NextFunction) 
{
  let id = req.params.id;

    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        const err = errors.array();
        console.log(err);
        user.findById(id, {}, {}, (error, userToUpdate ) => {
          if (error)
          {
            return console.error(error);
          } 
          else {
          // show the edit page with the data
          return res.render('index', {title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: UserDisplayName(req), err, user : userToUpdate, userId : getUserId(req)  });
        }});
    }
    next();
}