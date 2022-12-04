import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const DecryptData = async (req: Request, res: Response, next: NextFunction) => {
    const MySecretKey = process.env.JWT_SECRET_KEY?.toString();

    const decode = jwt.verify(req.body.request, `${MySecretKey}`);
    req.body = decode;

    next();
};

export default DecryptData;
