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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const mongoose_1 = __importStar(require("mongoose"));
const MyUserSchema = new mongoose_1.Schema({
    Role: [
        {
            type: String,
            enum: ['admin', 'customer'],
            default: 'customer'
        }
    ],
    firebaseUID: { type: String, required: true, unique: true },
    DefaultLogin: { type: String, default: 'customer' },
    Status: {
        type: String,
        enum: ['active', 'inactive', 'pending', 'blocked'],
        default: 'active'
    },
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    PhoneNumber: { type: String },
    Gender: {
        type: String
    },
    DateOfBirth: { type: Date },
    PhotoURL: { type: String },
    Address: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Address' }
}, {
    versionKey: false,
    timestamps: true
});
MyUserSchema.methods.setPassword = function (password) {
    this.salt = crypto_1.default.randomBytes(16).toString('hex');
    this.hash = crypto_1.default.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};
MyUserSchema.methods.validPassword = function (password) {
    const hash = crypto_1.default.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};
exports.default = mongoose_1.default.model('User', MyUserSchema);
