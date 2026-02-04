const axios = require('axios');

async function testImport() {
    try {
        // 1. Get an event
        const listRes = await axios.get('http://localhost:5000/api/events');
        const event = listRes.data.find(e => e.status !== 'imported');

        if (!event) {
            console.log('No non-imported events found to test.');
            return;
        }

        console.log(`Testing Import on Event: ${event.title} (Current Status: ${event.status})`);

        // 2. Import it
        const importRes = await axios.patch(`http://localhost:5000/api/events/${event._id}/status`, {
            status: 'imported',
            importedBy: 'test-admin@sydney.com',
            importNotes: 'Automated Verification'
        });

        console.log(`Import Request Status: ${importRes.status}`);
        console.log(`New Event Status: ${importRes.data.status}`);

        if (importRes.data.status === 'imported' && importRes.data.importedBy === 'test-admin@sydney.com') {
            console.log('✅ PASS: Event successfully imported.');
        } else {
            console.error('❌ FAIL: Event status did not update correctly.');
        }

    } catch (error) {
        console.error('❌ FAIL: Error during import test:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

testImport();
