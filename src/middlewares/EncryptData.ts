import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const EncryptData = async (req: Request, res: Response, next: NextFunction) => {
    const MySecretKey = process.env.JWT_SECRET_KEY?.toString();
    const encryptedData = jwt.sign(
        {
            ...res.locals.Response
        },
        `${MySecretKey}`
    );

    return res.send({
        response: encryptedData
    });
};

export default EncryptData;
