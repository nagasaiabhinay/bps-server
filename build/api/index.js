"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./auth/index"));
const apiRoutes = (0, express_1.default)();
apiRoutes.use('/auth', index_1.default);
apiRoutes.get('/ping', (req, res, next) => {
    res.status(200).json({
        message: 'Server is up and running'
    });
});
exports.default = apiRoutes;
