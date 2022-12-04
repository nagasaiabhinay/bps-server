import { Request, Response } from 'express';
import RoutesModel from './Routes.model';

const createRoutes = async (req: Request, res: Response) => {
    try {
        const { From, To, Timings, BusName, BusType, BusSeats, BusFare, BusNumber, BusDistance, BusOperatorName, BusOperatorNumber } = req.body;

        if (!From || !To || !Timings || !BusName || !BusType || !BusSeats || !BusFare || !BusNumber || !BusOperatorName || !BusOperatorNumber) {
            return res.status(400).json({
                title: 'Missing fields',
                message: 'Please fill all the fields',
                required: `Field "${
                    !From
                        ? 'From'
                        : !To
                        ? 'To'
                        : !Timings
                        ? 'Timings'
                        : !BusName
                        ? 'BusName'
                        : !BusType
                        ? 'BusType'
                        : !BusSeats
                        ? 'BusSeats'
                        : !BusFare
                        ? 'BusFare'
                        : !BusDistance
                        ? 'BusDistance'
                        : !BusNumber
                        ? 'BusNumber'
                        : !BusOperatorName
                        ? 'BusOperatorName'
                        : !BusOperatorNumber
                        ? 'BusOperatorNumber'
                        : ''
                }" is missing`
            });
        }

        const routeExists = await RoutesModel.findOne({
            From: {
                $regex: new RegExp(`^${From}$`, 'i')
            },
            To: {
                $regex: new RegExp(`^${To}$`, 'i')
            },
            Timings: {
                $regex: new RegExp(`^${Timings}$`, 'i')
            }
        });

        if (routeExists) {
            return res.status(400).json({
                title: 'Route already exists',
                message: 'Route already exists'
            });
        }

        const newRoutes = new RoutesModel({
            From,
            To,
            Timings,
            Bus: {
                Name: BusName,
                Type: BusType,
                Seats: BusSeats,
                Fare: BusFare,
                Distance: BusDistance,
                Number: BusNumber
            },
            BusOperator: {
                Name: BusOperatorName,
                Number: BusOperatorNumber
            }
        });
        const Routes = await newRoutes.save();
        res.status(200).json({
            message: 'Routes created successfully',
            Routes
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        });
    }
};

const getAllRoutes = async (req: Request, res: Response) => {
    try {
        const Routes = await RoutesModel.find();
        res.status(200).json({
            message: 'All Routes',
            Routes
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        });
    }
};

const updateRouteById = async (req: Request, res: Response) => {
    try {
        const { From, To, Timings, BusName, BusType, BusSeats, BusFare, BusDistance, BusNumber, BusOperatorName, BusOperatorNumber } = req.body;

        if (!From || !To || !Timings || !BusName || !BusType || !BusSeats || !BusFare || !BusDistance || !BusNumber || !BusOperatorName || !BusOperatorNumber) {
            return res.status(400).json({
                title: 'Missing fields',
                message: 'Please fill all the fields',
                required: `Field "${
                    !From
                        ? 'From'
                        : !To
                        ? 'To'
                        : !Timings
                        ? 'Timings'
                        : !BusName
                        ? 'BusName'
                        : !BusType
                        ? 'BusType'
                        : !BusSeats
                        ? 'BusSeats'
                        : !BusFare
                        ? 'BusFare'
                        : !BusDistance
                        ? 'BusDistance'
                        : !BusNumber
                        ? 'BusNumber'
                        : !BusOperatorName
                        ? 'BusOperatorName'
                        : !BusOperatorNumber
                        ? 'BusOperatorNumber'
                        : ''
                }" is missing`
            });
        }

        const routeExists = await RoutesModel.findById(req.query.id);

        if (!routeExists) {
            return res.status(400).json({
                title: 'Route does not exists',
                message: 'Route does not exists'
            });
        }

        const Routes = await RoutesModel.findByIdAndUpdate(
            req.query.id,
            {
                From,
                To,
                Timings,
                Bus: {
                    Name: BusName,
                    Type: BusType,
                    Seats: BusSeats,
                    Fare: BusFare,
                    Distance: BusDistance,
                    Number: BusNumber
                },
                BusOperator: {
                    Name: BusOperatorName,
                    Number: BusOperatorNumber
                }
            },
            { new: true }
        );
        res.status(200).json({
            message: 'Routes updated successfully',
            Routes
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        });
    }
};

const deleteRouteByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({
                title: 'Missing fields',
                message: 'Please fill all the fields',
                required: `Field "${!id ? 'id' : ''}" is missing`
            });
        }

        const routeExists = await RoutesModel.findById(id);

        if (!routeExists) {
            return res.status(400).json({
                title: 'Route does not exist',
                message: 'Route does not exist'
            });
        }

        await RoutesModel.findByIdAndDelete(id);

        return res.status(200).json({
            title: 'Route deleted',
            message: 'Route deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            title: 'Internal server error',
            message: error
        });
    }
};

export default { createRoutes, getAllRoutes, updateRouteById, deleteRouteByID };
