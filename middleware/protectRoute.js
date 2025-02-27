import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const protectRoute = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ msg: 'No token found or invalid format!' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.jwtKey);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Error in protectRoute:', err);
        return res.status(500).json({ msg: 'internal server error' });
    }
};

export default protectRoute;