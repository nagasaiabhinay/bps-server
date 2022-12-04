import dotenv from 'dotenv';

dotenv.config();

const LOCAL_URL = 'mongodb://127.0.0.1:27017/buspasssystem';

// const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
// const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
// const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@gkramdev.mkitdvu.mongodb.net/gkramdev`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 6768;

export const config = {
    mongo: {
        url: LOCAL_URL
    },
    server: {
        port: SERVER_PORT
    }
};
