import express from 'express';
import PassesRoutes from './passes/passes.routes';
import RegionRoutes from './region/region.routes';
import RoutesRoutes from './routes/Routes.routes';
import MyUserRoutes from './User/User.routes';

const Auth = express();

Auth.use('/user', MyUserRoutes);
Auth.use('/routes', RoutesRoutes);
Auth.use('/regions', RegionRoutes);
Auth.use('/passes', PassesRoutes);

// test route
Auth.get('/ping', (req, res) => {
    res.json({
        message: 'Server is up and running'
    });
});

export default Auth;
