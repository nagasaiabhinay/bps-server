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
const User_model_1 = __importDefault(require("./User.model"));
const createOrLoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const user = yield User_model_1.default.findOne({
        Email: Email
    });
    const token = jsonwebtoken_1.default.sign({ user }, 'BusPassSystem', {
        expiresIn: '1h',
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
    const newUser = new User_model_1.default({
        Name: Name,
        Email: Email,
        firebaseUID: firebaseUID,
        Role: 'customer'
    });
    const newToken = jsonwebtoken_1.default.sign({ newUser }, 'BusPassSystem', { expiresIn: '24h', algorithm: 'HS256' });
    try {
        yield newUser.save();
        res.status(200).json({
            title: 'User created',
            message: 'User created successfully',
            user: newUser,
            token: newToken
        });
    }
    catch (error) {
        return res.status(500).json({
            title: 'An error occurred',
            message: error
        });
    }
});
exports.default = { createOrLoginUser };
