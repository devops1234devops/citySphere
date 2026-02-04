import User from '../models/user.model.js';

export const googleLogin = async (req, res) => {
    try {
        const { email, name, sub, picture } = req.body;

        // Find or create user
        const user = await User.findOneAndUpdate(
            { $or: [{ googleId: sub }, { email }] },
            {
                email,
                name,
                googleId: sub,
                avatar: picture,
                role: 'admin' // Default to admin for this assignment as requested
            },
            { new: true, upsert: true }
        );

        res.json({
            message: 'Login successful',
            user: {
                email: user.email,
                name: user.name,
                role: user.role,
                avatar: user.avatar
            },
            token: 'authenticated-session' // Auth0 handles the real session, we just confirm DB sync
        });
    } catch (error) {
        console.error('Auth sync error:', error);
        res.status(500).json({ message: 'Error syncing user with database' });
    }
};
