import mongoose, { Document, Schema } from 'mongoose';

export interface Routes {
    From: string;
    To: string;
    Timings: string;
    Bus: {
        Name: string;
        Type: string;
        Seats: String;
        Fare: String;
        Distance: String;
        Number: string;
    };
    Status: string;
    BusOperator: {
        Name: string;
        Number: string;
    };
}

export interface RoutesModel extends Routes, Document {}

const RoutesSchema = new Schema(
    {
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
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<RoutesModel>('Routes', RoutesSchema);
