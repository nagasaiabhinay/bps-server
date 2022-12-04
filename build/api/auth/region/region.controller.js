"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const region_model_1 = __importDefault(require("./region.model"));
const createRegion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Name, PerMile, SqMiles } = req.body;
    if (!Name || !PerMile || !SqMiles) {
        return res.status(400).json({
            title: 'Missing fields',
            message: 'Please fill all the fields',
            required: `Field "${!Name ? 'Name' : !PerMile ? 'PerMile' : !SqMiles ? 'SqMiles' : ''}" is missing`
        });
    }
    const regionExists = yield region_model_1.default.findOne({
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
    const newRegion = new region_model_1.default({
        Name,
        PerMile,
        SqMiles
    });
    yield newRegion.save();
    return res.status(200).json({
        title: 'Region created',
        message: 'Region created successfully'
    });
});
const getAllRegions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const regions = yield region_model_1.default.find();
    return res.status(200).json({
        title: 'Regions',
        message: 'Regions fetched successfully',
        regions
    });
});
const updateRegionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({
            title: 'Missing fields',
            message: 'Please fill all the fields',
            required: `Field "${!id ? 'id' : ''}" is missing`
        });
    }
    const regionExists = yield region_model_1.default.findById(id);
    if (!regionExists) {
        return res.status(400).json({
            title: 'Region does not exist',
            message: 'Region does not exist'
        });
    }
    const { Name } = req.body;
    if (!Name) {
        return res.status(400).json({
            title: 'Missing fields',
            message: 'Please fill all the fields',
            required: `Field "${!Name ? 'Name' : ''}" is missing`
        });
    }
    yield region_model_1.default.findByIdAndUpdate(id, {
        Name
    });
    return res.status(200).json({
        title: 'Region updated',
        message: 'Region updated successfully'
    });
});
exports.default = {
    createRegion,
    getAllRegions,
    updateRegionById
};
