import mongoose, { Document, Schema, Types } from 'mongoose';

export interface Passes {
    category: string;
    details: object;
    startDate: string;
    endDate: string;
    passType: string;
    passStatus: string;
    userID: Types.ObjectId;
    paymentID: string;
}

export interface PassesModel extends Passes, Document {}

const PassesSchema = new Schema(
    {
        category: { type: String, required: true },
        details: { type: Object, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        passType: { type: String, required: true },
        passStatus: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active'
        },
        paymentID: {
            type: String,
            required: true
        },
        userID: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<PassesModel>('Passes', PassesSchema);
