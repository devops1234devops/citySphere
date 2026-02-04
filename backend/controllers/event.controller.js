import Event from '../models/event.model.js';

export const getAllEvents = async (req, res) => {
    try {
        const { city, keyword, status, startDate, endDate } = req.query;
        let query = {};

        if (city) query.city = new RegExp(city, 'i');
        if (status) query.status = status;
        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { "venue.name": { $regex: keyword, $options: 'i' } }
            ];
        }

        if (startDate || endDate) {
            query.dateTime = {};
            if (startDate) query.dateTime.$gte = new Date(startDate);
            if (endDate) query.dateTime.$lte = new Date(endDate);
        }

        const events = await Event.find(query).sort({ dateTime: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateEventStatus = async (req, res) => {
    try {
        const { status, importedBy, importNotes } = req.body;
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        event.status = status;
        if (status === 'imported') {
            event.importedAt = new Date();
            event.importedBy = importedBy || 'Admin';
            event.importNotes = importNotes;
        }
        await event.save();
        res.json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
