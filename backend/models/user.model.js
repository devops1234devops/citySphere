import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    googleId: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String },
    avatar: { type: String },
    role: { type: String, enum: ['admin', 'user'], default: 'admin' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
