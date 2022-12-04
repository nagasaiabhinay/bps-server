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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = __importDefault(require("../User/User.model"));
const passes_model_1 = __importDefault(require("./passes.model"));
const createNewPass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, details, startDate, endDate, passType, paymentID } = req.body;
    const token = req.headers.authorization;
    const decodedToken = jsonwebtoken_1.default.verify(`${token === null || token === void 0 ? void 0 : token.split(' ')[1]}`, 'BusPassSystem');
    const firebaseUID = decodedToken.newUser.firebaseUID;
    const user = yield User_model_1.default.findOne({
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
    const passExists = yield passes_model_1.default.findOne({
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
    const newPass = new passes_model_1.default({
        category,
        details,
        startDate,
        endDate,
        passType,
        paymentID,
        userID: user._id
    });
    try {
        yield newPass.save();
        return res.status(201).json({
            title: 'Pass created',
            message: 'Pass created successfully'
        });
    }
    catch (err) {
        return res.status(500).json({
            title: 'Error',
            message: err
        });
    }
});
const getAllPasses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.query;
    if (!userID) {
        return res.status(400).json({
            title: 'Missing fields',
            message: 'userID is required'
        });
    }
    passes_model_1.default
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
});
const checkPassValidity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({
            title: 'Missing fields',
            message: 'Please fill all the fields',
            required: `Field "${!id ? 'id' : ''}" is missing`
        });
    }
    passes_model_1.default
        .findById(id)
        .then((pass) => {
        const today = new Date();
        const end = new Date(`${pass === null || pass === void 0 ? void 0 : pass.endDate}`);
        if (end < today) {
            return res.status(200).json({
                title: 'Pass expired',
                message: 'Pass has expired'
            });
        }
        else {
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
});
exports.default = {
    createNewPass,
    getAllPasses,
    checkPassValidity
};
