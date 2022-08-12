"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdate = exports.validateRegister = exports.updateValidateCheck = exports.registerValidateCheck = void 0;
const express_validator_1 = require("express-validator");
const index_1 = require("./index");
const user_1 = __importDefault(require("../Models/user"));
exports.registerValidateCheck = [
    (0, express_validator_1.check)('firstName', 'First name cannot be blanked')
        .notEmpty(),
    (0, express_validator_1.check)('emailAddress', 'Enter a valid email address')
        .exists()
        .notEmpty()
        .withMessage("Email cannot be blanked")
        .isEmail()
        .normalizeEmail(),
    (0, express_validator_1.check)('password', 'Password must be 5 chars long and must contain a number')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 chars long')
        .matches(/\d/)
        .withMessage('Password must contain a number')
        .custom((value, { req }) => {
        if (value != req.body.confirmPassword) {
            throw new Error('Password confirmation is incorrect');
        }
        return true;
    })
];
exports.updateValidateCheck = [
    (0, express_validator_1.check)('firstName', 'First name cannot be blanked')
        .notEmpty(),
    (0, express_validator_1.check)('emailAddress', 'Enter a valid email address')
        .exists()
        .notEmpty()
        .withMessage("Email cannot be blanked")
        .isEmail()
        .normalizeEmail(),
    (0, express_validator_1.check)('confirmPassword')
        .custom((value, { req }) => {
        if (value != "") {
            if (value.length < 5) {
                throw new Error('Password must be 5 chars long');
            }
            ;
        }
        return true;
    })
];
function validateRegister(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const err = errors.array();
        console.log(err);
        return res.render('index', { title: 'Update', page: 'register', messages: req.flash('registerMessage'), displayName: (0, index_1.UserDisplayName)(req), err, user: '', userId: (0, index_1.getUserId)(req) });
    }
    next();
}
exports.validateRegister = validateRegister;
function validateUpdate(req, res, next) {
    let id = req.params.id;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const err = errors.array();
        console.log(err);
        user_1.default.findById(id, {}, {}, (error, userToUpdate) => {
            if (error) {
                return console.error(error);
            }
            else {
                return res.render('index', { title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: (0, index_1.UserDisplayName)(req), err, user: userToUpdate, userId: (0, index_1.getUserId)(req) });
            }
        });
    }
    next();
}
exports.validateUpdate = validateUpdate;
//# sourceMappingURL=validation.js.map