"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Routes_controller_1 = __importDefault(require("./Routes.controller"));
const Routes = express_1.default.Router();
Routes.post('/create-new-route', Routes_controller_1.default.createRoutes);
Routes.get('/get-all-routes', Routes_controller_1.default.getAllRoutes);
Routes.post('/update-route-by-id', Routes_controller_1.default.updateRouteById);
// test route
Routes.get('/ping', (req, res) => {
    res.json({
        message: 'Server is up and running'
    });
});
exports.default = Routes;
