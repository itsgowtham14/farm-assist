import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Please authenticate' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Auth error:', err);
        res.status(401).json({ error: 'Please authenticate' });
    }
};

export default auth;