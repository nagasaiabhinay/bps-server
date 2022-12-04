import crypto from 'crypto';
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface MyUser {
    Name: string;
    Email: string;
    PhoneNumber: string;
    firebaseUID: string;
    Gender: string;
    DateOfBirth: Date;
    PhotoURL: string;
    Address: Types.ObjectId;
    Role: string[];
    Status: string;
    DefaultLogin: string;
}

export interface MyUserModel extends MyUser, Document {}

const MyUserSchema = new Schema(
    {
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
        Address: { type: Schema.Types.ObjectId, ref: 'Address' }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

MyUserSchema.methods.setPassword = function (password: string) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

MyUserSchema.methods.validPassword = function (password: string) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

export default mongoose.model<MyUserModel>('User', MyUserSchema);
