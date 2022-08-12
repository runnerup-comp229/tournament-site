"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessLogoutPage = exports.ProcessRegisterPage = exports.ProcessLoginPage = exports.ProcessUpdatePage = exports.DisplayUpdatePage = exports.DisplayRegisterPage = exports.DisplayLoginPage = void 0;
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../Models/user"));
const Util_1 = require("../Util");
function DisplayLoginPage(req, res, next) {
    res.render('index', { title: 'Login', page: 'login', user: '', messages: req.flash('loginMessage'), displayName: (0, Util_1.UserDisplayName)(req), userId: (0, Util_1.getUserId)(req) });
}
exports.DisplayLoginPage = DisplayLoginPage;
function DisplayRegisterPage(req, res, next) {
    res.render('index', { title: 'Register', page: 'register', user: '', messages: req.flash('registerMessage'), displayName: (0, Util_1.UserDisplayName)(req), err: '', userId: (0, Util_1.getUserId)(req) });
}
exports.DisplayRegisterPage = DisplayRegisterPage;
function DisplayUpdatePage(req, res, next) {
    let id = req.params.id;
    user_1.default.findById(id, {}, {}, (err, userToUpdate) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.render('index', { title: 'Update', page: 'register', user: userToUpdate, messages: req.flash('registerMessage'), displayName: (0, Util_1.UserDisplayName)(req), err: '', userId: (0, Util_1.getUserId)(req) });
        }
        ;
    });
}
exports.DisplayUpdatePage = DisplayUpdatePage;
function ProcessUpdatePage(req, res, next) {
    let id = req.params.id;
    user_1.default.findById(id, function (err, User) {
        if (!user_1.default) {
            return console.error(err);
        }
        if (req.body.password != "" && req.body.confirmPassword != "") {
            User.changePassword(req.body.password, req.body.confirmPassword, function (err) {
                if (err) {
                    return console.error(err);
                }
            });
        }
        ;
        User.username = req.body.username;
        User.EmailAddress = req.body.emailAddress;
        User.DisplayName = req.body.firstName + " " + req.body.lastName;
        User.FirstName = req.body.firstName;
        User.LastName = req.body.lastName;
        User.save(function (err) {
            if (err) {
                return console.error(err);
            }
            ;
            res.redirect('/');
        });
    });
}
exports.ProcessUpdatePage = ProcessUpdatePage;
function ProcessLoginPage(req, res, next) {
    passport_1.default.authenticate('local', function (err, user, info) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        if (!user) {
            req.flash('loginMessage', 'Authentication Error!');
            return res.redirect('/login');
        }
        req.logIn(user, function (err) {
            if (err) {
                console.error(err);
                res.end(err);
            }
            return res.redirect('/home');
        });
    })(req, res, next);
}
exports.ProcessLoginPage = ProcessLoginPage;
function ProcessRegisterPage(req, res, next) {
    let newUser = new user_1.default({
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        DisplayName: req.body.firstName + " " + req.body.lastName
    });
    user_1.default.register(newUser, req.body.password, function (err) {
        if (err) {
            if (err.name == "UserExistsError") {
                console.error('ERROR: User Already Exists!');
                req.flash('registerMessage', 'Registration Error!');
            }
            else {
                console.error(err.name);
                req.flash('registerMessage', 'Server Error');
            }
            return res.redirect('/home');
        }
        return passport_1.default.authenticate('local')(req, res, function () {
            return res.redirect('/home');
        });
    });
}
exports.ProcessRegisterPage = ProcessRegisterPage;
function ProcessLogoutPage(req, res, next) {
    req.logOut(function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log("User Logged Out");
    });
    res.redirect('/login');
}
exports.ProcessLogoutPage = ProcessLogoutPage;
//# sourceMappingURL=auth.js.map