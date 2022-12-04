"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const RoutesSchema = new mongoose_1.Schema({
    From: { type: String, required: true },
    To: { type: String, required: true },
    Timings: {
        type: String,
        enum: ['EVERY-15-MIN', 'EVERY-30-MIN', 'EVERY-1-HOUR', 'EVERY-2-HOUR'],
        required: true
    },
    Bus: {
        Name: { type: String, required: true },
        Type: { type: String, required: true },
        Seats: { type: String, required: true },
        Fare: { type: String, required: true },
        Distance: { type: String, required: true },
        Number: { type: String, required: true }
    },
    Status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    BusOperator: {
        Name: { type: String, required: true },
        Number: { type: String, required: true }
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.default = mongoose_1.default.model('Routes', RoutesSchema);
