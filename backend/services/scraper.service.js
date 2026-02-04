import axios from 'axios';
import * as cheerio from 'cheerio';
import Event from '../models/event.model.js';

const SCRAPE_SOURCES = {
    OPERA_HOUSE: {
        url: 'https://www.sydneyoperahouse.com/whats-on',
        name: "Sydney Opera House",
        selector: '.card--event',
        parser: async ($, el) => {
            const title = $(el).find('.card__heading a span').text().trim();
            const relativeUrl = $(el).find('.card__link').attr('href');
            const url = relativeUrl ? `https://www.sydneyoperahouse.com${relativeUrl}` : '';

            const dateDisplay = $(el).find('.card__dates').text().trim();

            let image = $(el).find('img').attr('src');
            if (image && !image.startsWith('http')) {
                image = `https://www.sydneyoperahouse.com${image}`;
            }

            let description = '';
            let category = 'General';

            if (url) {
                try {
                    const detailHtml = await axios.get(url, {
                        headers: { 'User-Agent': 'Mozilla/5.0' }
                    });
                    const $detail = cheerio.load(detailHtml.data);

                    const tagline = $detail('.tagline.tagline--event').text().trim();
                    if (tagline) {
                        description = tagline;
                    } else {
                        const ogDesc = $detail('meta[property="og:description"]').attr('content');
                        if (ogDesc) {
                            description = ogDesc.trim();
                        } else {
                            description = $detail('meta[name="description"]').attr('content') || '';
                        }
                    }

                    const cats = [];
                    $detail('.event-header .tag-genre').each((_, tag) => {
                        cats.push($detail(tag).text().trim());
                    });
                    if (cats.length > 0) category = cats.join(', ');

                    const ogImage = $detail('meta[property="og:image"]').attr('content');
                    if (ogImage) image = ogImage;

                } catch (e) {
                    console.error(`Failed to fetch detail page for ${title}: ${e.message}`);
                }
            }

            if (!description) {
                description = `${title} at Sydney Opera House. ${dateDisplay}`;
            }

            return {
                title,
                description,
                dateDisplay,
                originalUrl: url,
                imageUrl: image,
                sourceWebsite: 'Sydney Opera House',
                category: [category],
                city: 'Sydney',
                venue: { name: 'Sydney Opera House', address: 'Bennelong Point, Sydney NSW 2000' },
                dateTime: new Date(),
            };
        }
    },
    WHATS_ON: {
        url: 'https://whatson.cityofsydney.nsw.gov.au/api/sitemap.xml',
        name: "What's On Sydney",
        selector: 'loc:contains("/events/")',
        xmlMode: true,
        limit: 15,
        parser: async ($, el) => {
            const originalUrl = $(el).text().trim();
            if (!originalUrl) return null;

            try {
                const { data } = await axios.get(originalUrl, {
                    headers: { 'User-Agent': 'Mozilla/5.0' }
                });
                const $detail = cheerio.load(data);

                const title = $detail('h1').first().text().trim() || $detail('meta[property="og:title"]').attr('content');

                const description = $detail('meta[name="description"]').attr('content') ||
                    $detail('meta[property="og:description"]').attr('content') || '';

                const imageUrl = $detail('meta[property="og:image"]').attr('content') || '';

                const dateDisplay = "Check website for details";

                const venueName = "Sydney";

                return {
                    title,
                    description,
                    dateDisplay,
                    originalUrl,
                    imageUrl,
                    sourceWebsite: "What's On Sydney",
                    category: ["Community"],
                    city: 'Sydney',
                    venue: { name: venueName, address: 'Sydney' },
                    dateTime: new Date(),
                };

            } catch (e) {
                console.error(`Error scraping detail for ${originalUrl}:`, e.message);
                return null;
            }
        }
    },
    TIMEOUT: {
        url: 'https://www.timeout.com/sydney/things-to-do',
        name: "Time Out Sydney",
        selector: 'article.tile',
        parser: async ($, el) => {
            const title = $(el).find('h3').text().trim();
            const relativeUrl = $(el).find('a').attr('href');
            const url = relativeUrl ? (relativeUrl.startsWith('http') ? relativeUrl : `https://www.timeout.com${relativeUrl}`) : '';

            let image = $(el).find('img').attr('src');

            const description = $(el).find('[class*="_summary_"]').text().trim();
            const primaryCat = $(el).find('[class*="_primaryCategory_"]').text().trim() || 'Things to do';

            const dateDisplay = "Check website for details";

            if (!title || !url) return null;

            return {
                title,
                description,
                dateDisplay,
                originalUrl: url,
                imageUrl: image,
                sourceWebsite: 'Time Out Sydney',
                category: [primaryCat],
                city: 'Sydney',
                venue: { name: 'Various', address: 'Sydney' },
                dateTime: new Date(),
            };
        }
    }
};

class ScraperService {
    async scrapeSource(sourceKey) {
        const source = SCRAPE_SOURCES[sourceKey];
        try {
            const { data } = await axios.get(source.url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });
            const $ = cheerio.load(data, source.xmlMode ? { xmlMode: true } : {});
            let events = [];

            let elements = $(source.selector).toArray();

            if (source.limit && elements.length > source.limit) {
                elements = elements.slice(0, source.limit);
            }

            console.log(`Processing ${elements.length} items for ${source.name}...`);

            for (const el of elements) {
                const event = await source.parser($, el);
                if (event) {
                    events.push({
                        ...event,
                        status: 'new'
                    });
                }
            }

            return events;
        } catch (error) {
            console.error(`Error scraping ${source.name}:`, error.message);
            return [];
        }
    }

    async runScraper() {
        console.log('Starting multi-source scraper...');
        const scrapedUrls = new Set();
        let totalNew = 0;
        let totalUpdated = 0;
        let totalInactive = 0;

        for (const sourceKey of Object.keys(SCRAPE_SOURCES)) {
            const source = SCRAPE_SOURCES[sourceKey];
            console.log(`Scraping source: ${source.name}`);
            let scrapedEvents = await this.scrapeSource(sourceKey);
            const sourceScrapedUrls = new Set();

            for (const eventData of scrapedEvents) {
                scrapedUrls.add(eventData.originalUrl);
                sourceScrapedUrls.add(eventData.originalUrl);
                const existingEvent = await Event.findOne({ originalUrl: eventData.originalUrl });

                if (!existingEvent) {
                    await Event.create(eventData);
                    totalNew++;
                } else {
                    const hasChanges =
                        existingEvent.title !== eventData.title ||
                        existingEvent.description !== eventData.description ||
                        existingEvent.imageUrl !== eventData.imageUrl ||
                        existingEvent.dateDisplay !== eventData.dateDisplay ||
                        existingEvent.status === 'inactive' ||
                        JSON.stringify(existingEvent.venue) !== JSON.stringify(eventData.venue) ||
                        JSON.stringify(existingEvent.category) !== JSON.stringify(eventData.category);

                    if (hasChanges) {
                        existingEvent.status = existingEvent.status === 'inactive' ? 'new' : 'updated';
                        existingEvent.title = eventData.title;
                        existingEvent.description = eventData.description;
                        existingEvent.imageUrl = eventData.imageUrl;
                        existingEvent.dateDisplay = eventData.dateDisplay;
                        existingEvent.venue = eventData.venue;
                        existingEvent.category = eventData.category;
                        existingEvent.lastScrapedAt = new Date();
                        await existingEvent.save();
                        totalUpdated++;
                    }
                }
            }

            const sourceActiveEvents = await Event.find({
                sourceWebsite: source.name,
                status: { $ne: 'inactive' }
            });

            for (const event of sourceActiveEvents) {
                if (!sourceScrapedUrls.has(event.originalUrl)) {
                    if (!event.originalUrl.includes('example.com')) {
                        event.status = 'inactive';
                        await event.save();
                        totalInactive++;
                    }
                }
            }
        }

        console.log(`Multi-source scrape completed. New: ${totalNew}, Updated: ${totalUpdated}, Inactive: ${totalInactive}`);
        return { totalNew, totalUpdated, totalInactive };
    }
}

export default new ScraperService();
