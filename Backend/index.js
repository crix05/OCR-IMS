import express from 'express';
import cors from 'cors';
import { pool } from './pool.js';
import authRoutes from './Routes/auth.js';
import transactionRoutes from './Routes/transaction.js'
import itemRoutes from './Routes/items.js'
import 'dotenv/config';
import { verifyToken } from './Utils/jwt.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    credentials: "true",
}));

async function startServer() {
    try {
        app.use('/auth', authRoutes);
        app.use('/transaction', verifyToken, transactionRoutes);
        app.use('/items', verifyToken, itemRoutes);

        app.listen(3000, () => {
            console.log("Server running on http://localhost:3000");
        })
    } catch(err) {
        console.log("Connection failed", err.message);
        process.exit(1);
    }
}

startServer();