import mongoose from 'mongoose';
import dotenv from 'dotenv';
import scraperService from './services/scraper.service.js';

dotenv.config();

const run = async () => {
    try {
        console.log("Connecting to DB...");
        if (!process.env.MONGODB_URI) {
            console.warn("MONGODB_URI not found in .env, using default local URI");
        }
        const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/assignment';

        await mongoose.connect(uri);
        console.log("Connected. Running Scraper...");

        const stats = await scraperService.runScraper();
        console.log("SUCCESS:", stats);

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("FATAL ERROR:", error.message);
        process.exit(1);
    }
};

run();
