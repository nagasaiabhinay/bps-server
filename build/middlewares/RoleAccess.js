"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoleAccess = (roles) => {
    return (req, res, next) => {
        if (!req.body.user.Role.some((role) => roles.includes(role))) {
            return res.status(401).json({
                title: 'Unauthorized',
                message: 'You are not authorized to access this resource'
            });
        }
        next();
    };
};
exports.default = RoleAccess;
