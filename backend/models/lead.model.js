import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
    email: { type: String, required: true },
    hasConsent: { type: Boolean, required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    eventName: { type: String },
    source: { type: String }
}, { timestamps: true });

export default mongoose.model('Lead', leadSchema);
