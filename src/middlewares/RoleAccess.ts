import { NextFunction, Request, Response } from 'express';

const RoleAccess = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.user.Role.some((role: string) => roles.includes(role))) {
            return res.status(401).json({
                title: 'Unauthorized',
                message: 'You are not authorized to access this resource'
            });
        }
        next();
    };
};

export default RoleAccess;
