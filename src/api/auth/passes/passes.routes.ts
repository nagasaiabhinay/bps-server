import express from 'express';

import PassesController from './passes.controller';

const Passes = express.Router();

Passes.post('/create-new-pass', PassesController.createNewPass);
Passes.get('/get-all-passes', PassesController.getAllPasses);
Passes.post('/check-pass-validity', PassesController.checkPassValidity);

// test route
Passes.get('/ping', (req, res) => {
    res.json({
        message: 'Server is up and running'
    });
});

export default Passes;
