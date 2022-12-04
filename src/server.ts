import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import apiRoutes from './api/index';
import { config } from './config/config';
import Logging from './library/Logging';

const router = express();
console.log(router);

mongoose
    .connect(config.mongo.url, {
        retryWrites: true,
        w: 'majority'
    })
    .then(() => {
        Logging.info(`MongoDB connected`);
        StartServer();
    })
    .catch((err) => {
        Logging.error('MongoDB connection error. Please make sure MongoDB is running');
        Logging.error(err);
    });

const StartServer = () => {
    router.set('trust proxy', true);

    router.use((req: Request, res: Response, next: NextFunction) => {
        Logging.info(`Incoming => Method:[${req.method}] - URL:[${req.url}] - IP:[${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            Logging.info(`Outgoing => Method:[${req.method}] - URL:[${req.url}] - IP:[${req.socket.remoteAddress}] - Status:[${res.statusCode}]`);
        });
        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());
    router.use(cors());

    router.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-with,Content-Type, Accept,Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
            return res.status(200).json({});
        }
        next();
    });

    router.use('/v1', apiRoutes);
    router.use('/ping', (req, res) => {
        res.json({
            message: 'Server is up and running'
        });
    });

    router.use((req: Request, res: Response, next: NextFunction) => {
        const error = new Error('Not found');
        Logging.error(error);
        return res.status(404).json({
            RequestUrl: req.url,
            message: error.message
        });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server started on port ${config.server.port} and url is http://localhost:${config.server.port}`));
};
