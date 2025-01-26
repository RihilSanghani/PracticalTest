import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
export const connectionDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB', conn.connection.host);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}