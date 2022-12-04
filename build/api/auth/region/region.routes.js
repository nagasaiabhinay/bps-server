"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const region_controller_1 = __importDefault(require("./region.controller"));
const Region = express_1.default.Router();
Region.post('/create-new-region', region_controller_1.default.createRegion);
Region.get('/get-all-regions', region_controller_1.default.getAllRegions);
Region.post('/update-region-by-id', region_controller_1.default.updateRegionById);
// test route
Region.get('/ping', (req, res) => {
    res.json({
        message: 'Server is up and running'
    });
});
exports.default = Region;
