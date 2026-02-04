import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    dateTime: { type: Date, required: true },
    dateDisplay: { type: String },
    venue: {
        name: { type: String, required: true },
        address: { type: String }
    },
    city: { type: String, default: 'Sydney' },
    description: { type: String },
    category: [{ type: String }],
    imageUrl: { type: String },
    sourceWebsite: { type: String, required: true },
    originalUrl: { type: String, required: true, unique: true },
    status: {
        type: String,
        enum: ['new', 'updated', 'inactive', 'imported'],
        default: 'new'
    },
    lastScrapedAt: { type: Date, default: Date.now },
    importedAt: { type: Date },
    importedBy: { type: String },
    importNotes: { type: String }
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
