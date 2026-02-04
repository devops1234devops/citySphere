import Lead from '../models/lead.model.js';

export const createLead = async (req, res) => {
    try {
        const lead = new Lead(req.body);
        await lead.save();
        res.status(201).json(lead);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllLeads = async (req, res) => {
    try {
        const leads = await Lead.find().populate('eventId').sort({ createdAt: -1 });
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
