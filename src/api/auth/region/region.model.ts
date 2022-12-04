import mongoose, { Document, Schema } from 'mongoose';

export interface Regions {
    Name: string;
    PerMile: number;
    SqMiles: number;
    Category: string;
    Status: string;
}

export interface RegionsModel extends Regions, Document {}

const RegionsSchema = new Schema(
    {
        Name: { type: String, required: true },
        Category: {
            type: String,
            required: true,
            default: 'region'
        },
        PerMile: {
            type: String,
            required: true
        },
        SqMiles: {
            type: String,
            required: true
        },
        Status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active'
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<RegionsModel>('Regions', RegionsSchema);
