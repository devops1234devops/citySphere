import cron from 'node-cron';
import scraperService from './scraper.service.js';

class CronService {
    init() {
        console.log('Initializing Cron Service...');

        cron.schedule('0 */6 * * *', async () => {
            console.log('Running scheduled scrape...');
            try {
                await scraperService.runScraper();
            } catch (error) {
                console.error('Error in scheduled scrape:', error);
            }
        });

        this.runOnceOnStartup();
    }

    async runOnceOnStartup() {
        console.log('Running initial scrape on startup...');
        try {
            await scraperService.runScraper();
        } catch (error) {
            console.error('Error in startup scrape:', error);
        }
    }
}

export default new CronService();
