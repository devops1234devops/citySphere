export const googleLogin = async (req, res) => {
    const { email, name, googleId, avatar } = req.body;
    res.json({
        message: 'Login successful',
        user: { email, name, role: 'admin', avatar },
        token: 'mock-jwt-token'
    });
};
