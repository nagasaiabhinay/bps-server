"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passes_routes_1 = __importDefault(require("./passes/passes.routes"));
const region_routes_1 = __importDefault(require("./region/region.routes"));
const Routes_routes_1 = __importDefault(require("./routes/Routes.routes"));
const User_routes_1 = __importDefault(require("./User/User.routes"));
const Auth = (0, express_1.default)();
Auth.use('/user', User_routes_1.default);
Auth.use('/routes', Routes_routes_1.default);
Auth.use('/regions', region_routes_1.default);
Auth.use('/passes', passes_routes_1.default);
// test route
Auth.get('/ping', (req, res) => {
    res.json({
        message: 'Server is up and running'
    });
});
exports.default = Auth;
