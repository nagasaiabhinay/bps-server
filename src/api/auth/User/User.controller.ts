import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from './User.model';

const createOrLoginUser = async (req: Request, res: Response) => {
    try {
        const { Name, Email, firebaseUID } = req.body;

        if (!Name) {
            return res.status(400).json({
                title: 'Missing fields',
                message: 'Name is required'
            });
        }

        if (!Email) {
            return res.status(400).json({
                title: 'Missing fields',
                message: 'Email is required'
            });
        }

        if (!firebaseUID) {
            return res.status(400).json({
                title: 'Missing fields',
                message: 'firebaseUID is required'
            });
        }

        const user = await UserModel.findOne({
            Email: Email
        });

        const token = jwt.sign({ user: user }, 'BusPassSystem', {
            expiresIn: '60d',
            algorithm: 'HS256'
        });

        if (user) {
            return res.status(200).json({
                title: 'User logged in',
                message: 'User logged in successfully',
                user,
                token
            });
        }

        const newUser = new UserModel({
            Name: Name,
            Email: Email,
            firebaseUID: firebaseUID,
            Role: 'customer'
        });

        const newToken = jwt.sign({ user: newUser }, 'BusPassSystem', { expiresIn: '60d', algorithm: 'HS256' });

        try {
            await newUser.save();
            res.status(200).json({
                title: 'User created',
                message: 'User created successfully',
                user: newUser,
                token: newToken
            });
        } catch (error) {
            return res.status(500).json({
                title: 'An error occurred',
                message: error
            });
        }
    } catch (error) {
        return res.status(200).json({
            title: 'An error occurred',
            message: error
        });
    }
};

export default { createOrLoginUser };
