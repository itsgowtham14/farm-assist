import jwt from 'jsonwebtoken';

export const isAdmin = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ error: 'Please authenticate' });

        // For admin token (hardcoded check)
        if (token === 'admin_token') {
            req.isAdmin = true;
            next();
            return;
        }

        // For regular user tokens
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        if (!decoded.isAdmin) {
            return res.status(403).json({ error: 'Admin access required' });
        }
        
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};