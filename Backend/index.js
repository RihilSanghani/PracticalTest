import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectionDb } from './Lib/db.js';
import authRoutes from './Routes/auth.route.js';
import formRoutes from './Routes/form.route.js';


const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT;

app.use('/api/auth', authRoutes);
app.use('/api/forms', formRoutes);

app.listen(PORT, () => {
    connectionDb();
    console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
    console.error(`Failed to start server: ${err.message}`);
});