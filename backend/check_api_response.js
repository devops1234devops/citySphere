import axios from 'axios';

const checkApi = async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/events');
        const timeoutEvents = res.data.filter(e => e.sourceWebsite === 'Time Out Sydney');
        console.log(`API returned ${timeoutEvents.length} Time Out events.`);

        if (timeoutEvents.length > 0) {
            console.log("Sample:", JSON.stringify(timeoutEvents[0], null, 2));
        }
    } catch (error) {
        console.error("API Check failed:", error.message);
    }
};

checkApi();
