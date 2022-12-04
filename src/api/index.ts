import express from 'express';
import AuthRoutes from './auth/index';

const apiRoutes = express();

apiRoutes.use('/auth', AuthRoutes);

apiRoutes.get('/ping', (req, res, next) => {
    res.status(200).json({
        message: 'Server is up and running'
    });
});

export default apiRoutes;
