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
const User_model_1 = __importDefault(require("../api/auth/User/User.model"));
const Logging_1 = __importDefault(require("../library/Logging"));
const VerifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const idToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    const MySecretKey = (_b = process.env.JWT_SECRET_KEY) === null || _b === void 0 ? void 0 : _b.toString();
    try {
        if (!idToken) {
            Logging_1.default.error('No token provided');
            return res.status(401).json({
                title: 'token Required',
                message: 'No token provided'
            });
        }
        const decoded = jsonwebtoken_1.default.verify(idToken, MySecretKey);
        if (!decoded) {
            return res.status(401).json({
                Title: 'Unauthorized',
                message: 'Invalid token or token has expired'
            });
        }
        req.body.user = decoded;
        const user = yield User_model_1.default.findById(req.body.user.id);
        if (!user) {
            return res.status(400).json({
                title: 'User not found',
                message: 'User not found'
            });
        }
        next();
    }
    catch (error) {
        Logging_1.default.wran('Error verifying token' + error);
        return res.status(401).json({
            Title: 'Error verifying token',
            message: 'Invalid token or token has expired Please login again'
        });
    }
});
exports.default = VerifyUser;
