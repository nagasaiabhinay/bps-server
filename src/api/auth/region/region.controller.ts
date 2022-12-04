import { Request, Response } from 'express';
import regionModel from './region.model';

const createRegion = async (req: Request, res: Response) => {
    try {
        const { Name, PerMile, SqMiles } = req.body;

        if (!Name || !PerMile || !SqMiles) {
            return res.status(400).json({
                title: 'Missing fields',
                message: 'Please fill all the fields',
                required: `Field "${!Name ? 'Name' : !PerMile ? 'PerMile' : !SqMiles ? 'SqMiles' : ''}" is missing`
            });
        }

        const regionExists = await regionModel.findOne({
            Name: {
                $regex: new RegExp(`^${Name}$`, 'i')
            }
        });

        if (regionExists) {
            return res.status(400).json({
                title: 'Region already exists',
                message: 'Region already exists'
            });
        }

        const newRegion = new regionModel({
            Name,
            PerMile,
            SqMiles
        });

        await newRegion.save();

        return res.status(200).json({
            title: 'Region created',
            message: 'Region created successfully'
        });
    } catch (error) {
        return res.status(500).json({
            title: 'Internal server error',
            message: error
        });
    }
};

const getAllRegions = async (req: Request, res: Response) => {
    try {
        const regions = await regionModel.find();

        return res.status(200).json({
            title: 'Regions',
            message: 'Regions fetched successfully',
            regions
        });
    } catch (error) {
        return res.status(500).json({
            title: 'Internal server error',
            message: error
        });
    }
};

const updateRegionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({
                title: 'Missing fields',
                message: 'Please fill all the fields',
                required: `Field "${!id ? 'id' : ''}" is missing`
            });
        }

        const regionExists = await regionModel.findById(id);

        if (!regionExists) {
            return res.status(400).json({
                title: 'Region does not exist',
                message: 'Region does not exist'
            });
        }

        await regionModel.findByIdAndUpdate(id, req.body);

        return res.status(200).json({
            title: 'Region updated',
            message: 'Region updated successfully'
        });
    } catch (error) {
        return res.status(500).json({
            title: 'Internal server error',
            message: error
        });
    }
};

const deleteRegionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({
                title: 'Missing fields',
                message: 'Please fill all the fields',
                required: `Field "${!id ? 'id' : ''}" is missing`
            });
        }

        const regionExists = await regionModel.findById(id);

        if (!regionExists) {
            return res.status(400).json({
                title: 'Region does not exist',
                message: 'Region does not exist'
            });
        }

        await regionModel.findByIdAndDelete(id);

        return res.status(200).json({
            title: 'Region deleted',
            message: 'Region deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            title: 'Internal server error',
            message: error
        });
    }
};

export default {
    createRegion,
    getAllRegions,
    updateRegionById,
    deleteRegionById
};
