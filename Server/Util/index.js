"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = exports.AuthGuard = exports.UserDisplayName = void 0;
function UserDisplayName(req) {
    if (req.user) {
        let user = req.user;
        return user.DisplayName.toString();
    }
    return '';
}
exports.UserDisplayName = UserDisplayName;
function AuthGuard(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
exports.AuthGuard = AuthGuard;
function getUserId(req) {
    if (req.user) {
        let user = req.user;
        return user._id.toString();
    }
    return '';
}
exports.getUserId = getUserId;
//# sourceMappingURL=index.js.map