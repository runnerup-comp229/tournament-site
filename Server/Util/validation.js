"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = exports.registerValidateCheck = void 0;
const express_validator_1 = require("express-validator");
const _1 = require(".");
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
function validateRegister(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const err = errors.array();
        console.log(err);
        return res.render('index', { title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: (0, _1.UserDisplayName)(req), err });
    }
    next();
}
exports.validateRegister = validateRegister;
//# sourceMappingURL=validation.js.map