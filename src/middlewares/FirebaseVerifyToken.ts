import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Logging from '../library/Logging';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const idToken = req.query.token as string;

    if (!idToken) {
        Logging.error('No token provided');
        return res.status(401).json({
            title: 'token Required',
            message: 'No token provided'
        });
    }

    try {
        const decodeToken = jwt.decode(idToken);
        if (!decodeToken) {
            return res.status(401).json({
                Title: 'Unauthorized',
                message: 'Invalid token or token has expired'
            });
        }
        req.query.firebaseID = JSON.parse(JSON.stringify(decodeToken.sub));

        next();
    } catch (error) {
        Logging.wran('Error verifying token' + error);
        return res.status(401).json({
            Title: 'Error verifying token',
            message: error
        });
    }
};

export default verifyToken;
