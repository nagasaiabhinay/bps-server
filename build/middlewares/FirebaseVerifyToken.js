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
const Logging_1 = __importDefault(require("../library/Logging"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const idToken = req.query.token;
    if (!idToken) {
        Logging_1.default.error('No token provided');
        return res.status(401).json({
            title: 'token Required',
            message: 'No token provided'
        });
    }
    try {
        const decodeToken = jsonwebtoken_1.default.decode(idToken);
        if (!decodeToken) {
            return res.status(401).json({
                Title: 'Unauthorized',
                message: 'Invalid token or token has expired'
            });
        }
        req.query.firebaseID = JSON.parse(JSON.stringify(decodeToken.sub));
        next();
    }
    catch (error) {
        Logging_1.default.wran('Error verifying token' + error);
        return res.status(401).json({
            Title: 'Error verifying token',
            message: error
        });
    }
});
exports.default = verifyToken;
