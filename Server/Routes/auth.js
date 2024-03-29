"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../Controllers/auth");
const Util_1 = require("../Util");
const validation_1 = require("../Util/validation");
router.get('/login', auth_1.DisplayLoginPage);
router.get('/register', auth_1.DisplayRegisterPage);
router.get('/update/:id', Util_1.AuthGuard, auth_1.DisplayUpdatePage);
router.post('/update/:id', Util_1.AuthGuard, validation_1.updateValidateCheck, validation_1.validateUpdate, auth_1.ProcessUpdatePage);
router.post('/login', auth_1.ProcessLoginPage);
router.post('/register', validation_1.registerValidateCheck, validation_1.validateRegister, auth_1.ProcessRegisterPage);
router.get('/logout', auth_1.ProcessLogoutPage);
exports.default = router;
//# sourceMappingURL=auth.js.map