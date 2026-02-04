import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cronService from './services/cron.service.js';
import eventRoutes from './routes/event.routes.js';
import leadRoutes from './routes/lead.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/events', eventRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', time: new Date() });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    cronService.init();
});
