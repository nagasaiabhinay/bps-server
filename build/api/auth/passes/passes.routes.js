"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passes_controller_1 = __importDefault(require("./passes.controller"));
const Passes = express_1.default.Router();
Passes.post('/create-new-pass', passes_controller_1.default.createNewPass);
Passes.get('/get-all-passes', passes_controller_1.default.getAllPasses);
Passes.post('/check-pass-validity', passes_controller_1.default.checkPassValidity);
// test route
Passes.get('/ping', (req, res) => {
    res.json({
        message: 'Server is up and running'
    });
});
exports.default = Passes;
