"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./api/index"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const router = (0, express_1.default)();
mongoose_1.default
    .connect(config_1.config.mongo.url, {
    retryWrites: true,
    w: 'majority'
})
    .then(() => {
    Logging_1.default.info(`MongoDB connected`);
    StartServer();
})
    .catch((err) => {
    Logging_1.default.error('MongoDB connection error. Please make sure MongoDB is running');
    Logging_1.default.error(err);
});
const StartServer = () => {
    router.use((req, res, next) => {
        Logging_1.default.info(`Incoming => Method:[${req.method}] - URL:[${req.url}] - IP:[${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            Logging_1.default.info(`Outgoing => Method:[${req.method}] - URL:[${req.url}] - IP:[${req.socket.remoteAddress}] - Status:[${res.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    router.use((0, cors_1.default)());
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-with,Content-Type, Accept,Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
            return res.status(200).json({});
        }
        next();
    });
    // router.use('/v1', DecryptData, apiRoutes, EncryptData);
    router.use('/v1', index_1.default);
    router.use('/ping', (req, res) => {
        res.json({
            message: 'Server is up and running'
        });
    });
    router.use((req, res, next) => {
        const error = new Error('Not found');
        Logging_1.default.error(error);
        return res.status(404).json({
            RequestUrl: req.url,
            message: error.message
        });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => Logging_1.default.info(`Server started on port ${config_1.config.server.port} and url is http://localhost:${config_1.config.server.port}`));
};
