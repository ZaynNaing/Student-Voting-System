import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware: RequestHandler<unknown, unknown, unknown, unknown> = (req, res, next) => {
    const authHeader = req.headers.authorization || "";

    if (!authHeader) {
        res.status(401).json({ message: "Authorization header is missing" });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>

    if (!token) {
        res.status(401).json({ message: "Token is missing" });
    }

    try {
        const secretKey = process.env.JWT_SECRET || "default_secret_key";
        const decoded = jwt.verify(token, secretKey);
        (req as any).user = decoded; // Attach the decoded user info to the request object
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
