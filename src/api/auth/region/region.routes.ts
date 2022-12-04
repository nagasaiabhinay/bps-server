import express from 'express';

import RegionController from './region.controller';

const Region = express.Router();

Region.post('/create-new-region', RegionController.createRegion);
Region.get('/get-all-regions', RegionController.getAllRegions);
Region.post('/update-region-by-id', RegionController.updateRegionById);

// test route
Region.get('/ping', (req, res) => {
    res.json({
        message: 'Server is up and running'
    });
});

export default Region;
