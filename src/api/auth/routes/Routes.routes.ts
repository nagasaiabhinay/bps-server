import express from 'express';
import RoutesController from './Routes.controller';

const Routes = express.Router();

Routes.post('/create-new-route', RoutesController.createRoutes);
Routes.get('/get-all-routes', RoutesController.getAllRoutes);
Routes.post('/update-route-by-id', RoutesController.updateRouteById);

// test route
Routes.get('/ping', (req, res) => {
    res.json({
        message: 'Server is up and running'
    });
});

export default Routes;
