import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../User/User.model';
import passesModel from './passes.model';

const createNewPass = async (req: Request, res: Response) => {
    const { category, details, startDate, endDate, passType, paymentID } = req.body;
    const token = req.headers.authorization;

    const decodedToken = jwt.verify(`${token?.split(' ')[1]}`, 'BusPassSystem') as any;
    const firebaseUID = decodedToken.newUser.firebaseUID;

    const user = await UserModel.findOne({
        firebaseUID: firebaseUID
    });

    if (!user) {
        return res.status(400).json({
            title: 'User not found',
            message: 'User not found'
        });
    }

    if (!category || !details || !startDate || !endDate || !passType || !paymentID) {
        return res.status(400).json({
            title: 'Missing fields',
            message: 'Please fill all the fields',
            required: `Field "${!category ? 'category' : !details ? 'details' : !startDate ? 'startDate' : !endDate ? 'endDate' : !passType ? 'passType' : !paymentID ? 'paymentID' : ''}" is missing`
        });
    }

    const passExists = await passesModel.findOne({
        details: {
            $regex: new RegExp(`^${details}$`, 'i')
        }
    });

    if (passExists) {
        return res.status(400).json({
            title: 'Pass already exists',
            message: 'Pass already exists'
        });
    }

    const newPass = new passesModel({
        category,
        details,
        startDate,
        endDate,
        passType,
        paymentID,
        userID: user._id
    });

    try {
        await newPass.save();
        return res.status(201).json({
            title: 'Pass created',
            message: 'Pass created successfully'
        });
    } catch (err) {
        return res.status(500).json({
            title: 'Error',
            message: err
        });
    }
};

const getAllPasses = async (req: Request, res: Response) => {
    const { userID } = req.query;

    if (!userID) {
        return res.status(400).json({
            title: 'Missing fields',
            message: 'userID is required'
        });
    }

    passesModel
        .find({
            userID: userID
        })
        .then((passes) => {
            if (!passes) {
                return res.status(400).json({
                    title: 'No passes found',
                    message: 'No passes found'
                });
            }

            return res.status(200).json({
                title: 'Passes found',
                message: 'Passes found successfully',
                passes
            });
        });
};

const checkPassValidity = async (req: Request, res: Response) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({
            title: 'Missing fields',
            message: 'Please fill all the fields',
            required: `Field "${!id ? 'id' : ''}" is missing`
        });
    }

    passesModel
        .findById(id)
        .then((pass) => {
            const today = new Date();
            const end = new Date(`${pass?.endDate}`);
            if (end < today) {
                return res.status(200).json({
                    title: 'Pass expired',
                    message: 'Pass has expired'
                });
            } else {
                return res.status(200).json({
                    title: 'Pass valid',
                    message: 'Pass is valid'
                });
            }
        })
        .catch((err) => {
            return res.status(500).json({
                title: 'Error',
                message: 'Something went wrong'
            });
        });
};

export default {
    createNewPass,
    getAllPasses,
    checkPassValidity
};
