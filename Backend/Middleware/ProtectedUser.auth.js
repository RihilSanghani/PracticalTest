import jwt from 'jsonwebtoken';
import UserModels from '../Models/User.models.js';

export const ProtectedUser = async (req, res, next) => {
    try {
        const token = req.body.authToken;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const user = await UserModels.findById(decoded.user).select('-password');
        if (!user) {
            return res.status(403).json({ message: 'User not found' });
        }

        req.user = user;

        next();
    }
    catch (error) {
        console.log("Error in middleware authentication", error);
        return res.status(401).json({ message: 'Invalid token' });
    }
}