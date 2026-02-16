import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secretKey = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '10000h';

export function generateToken(payload) {
    return jwt.sign(payload, secretKey, {expiresIn: jwtExpiresIn});
}

export function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(" ")[1];
        if(!token) {
            return res.status(401).json({ error:'Token missing' });
        }
        const decoded = jwt.verify(token, secretKey);
        req.body.uid = decoded.uid;
        next();
    } catch(error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
}