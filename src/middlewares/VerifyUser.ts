import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../api/auth/User/User.model';
import Logging from '../library/Logging';

const VerifyUser = async (req: Request, res: Response, next: NextFunction) => {
    const idToken = req.headers.authorization?.split(' ')[1] as string;
    const MySecretKey = process.env.JWT_SECRET_KEY?.toString();
    try {
        if (!idToken) {
            Logging.error('No token provided');
            return res.status(401).json({
                title: 'token Required',
                message: 'No token provided'
            });
        }
        const decoded = jwt.verify(idToken, MySecretKey as string);
        if (!decoded) {
            return res.status(401).json({
                Title: 'Unauthorized',
                message: 'Invalid token or token has expired'
            });
        }
        req.body.user = decoded;

        const user = await UserModel.findById(req.body.user.id);

        if (!user) {
            return res.status(400).json({
                title: 'User not found',
                message: 'User not found'
            });
        }

        next();
    } catch (error) {
        Logging.wran('Error verifying token' + error);
        return res.status(401).json({
            Title: 'Error verifying token',
            message: 'Invalid token or token has expired Please login again'
        });
    }
};

export default VerifyUser;
