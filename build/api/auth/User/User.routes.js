"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_controller_1 = __importDefault(require("./User.controller"));
const User = express_1.default.Router();
User.post('/create-user', User_controller_1.default.createOrLoginUser);
// test route
User.get('/ping', (req, res) => {
    res.json({
        message: 'Server is up and running'
    });
});
exports.default = User;
