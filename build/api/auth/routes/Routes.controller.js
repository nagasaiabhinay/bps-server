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
const Routes_model_1 = __importDefault(require("./Routes.model"));
const createRoutes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { From, To, Timings, BusName, BusType, BusSeats, BusFare, BusNumber, BusDistance, BusOperatorName, BusOperatorNumber } = req.body;
        if (!From || !To || !Timings || !BusName || !BusType || !BusSeats || !BusFare || !BusNumber || !BusOperatorName || !BusOperatorNumber) {
            return res.status(400).json({
                title: 'Missing fields',
                message: 'Please fill all the fields',
                required: `Field "${!From
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
                                                            : ''}" is missing`
            });
        }
        const routeExists = yield Routes_model_1.default.findOne({
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
        const newRoutes = new Routes_model_1.default({
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
        const Routes = yield newRoutes.save();
        res.status(200).json({
            message: 'Routes created successfully',
            Routes
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        });
    }
});
const getAllRoutes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Routes = yield Routes_model_1.default.find();
        res.status(200).json({
            message: 'All Routes',
            Routes
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        });
    }
});
const updateRouteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { From, To, Timings, BusName, BusType, BusSeats, BusFare, BusDistance, BusNumber, BusOperatorName, BusOperatorNumber } = req.body;
        if (!From || !To || !Timings || !BusName || !BusType || !BusSeats || !BusFare || !BusDistance || !BusNumber || !BusOperatorName || !BusOperatorNumber) {
            return res.status(400).json({
                title: 'Missing fields',
                message: 'Please fill all the fields',
                required: `Field "${!From
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
                                                            : ''}" is missing`
            });
        }
        const routeExists = yield Routes_model_1.default.findById(req.query.id);
        if (!routeExists) {
            return res.status(400).json({
                title: 'Route does not exists',
                message: 'Route does not exists'
            });
        }
        const Routes = yield Routes_model_1.default.findByIdAndUpdate(req.query.id, {
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
        }, { new: true });
        res.status(200).json({
            message: 'Routes updated successfully',
            Routes
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error
        });
    }
});
exports.default = { createRoutes, getAllRoutes, updateRouteById };
