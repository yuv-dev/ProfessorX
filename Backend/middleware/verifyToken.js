const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'your_super_secret_key';

const verifyToken = (req, res, next) => {
    // Get token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token part after 'Bearer'

    if (token == null) return res.sendStatus(401); // If no token, unauthorized

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            console.error('Token verification failed:', err.message);
            return res.sendStatus(403); // If token is invalid or expired, forbidden
        }
        req.user = user; // Add decoded user payload to the request object
        next(); // Proceed to the protected route handler
    });
};

module.exports = verifyToken;
