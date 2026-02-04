require('dotenv').config();
const mongoose = require('mongoose');
const scraperService = require('../services/scraper.service');

async function run() {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected.');

        await scraperService.runScraper();

        console.log('Scrape complete. Closing connection.');
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error running scraper script:', error);
        process.exit(1);
    }
}

run();
