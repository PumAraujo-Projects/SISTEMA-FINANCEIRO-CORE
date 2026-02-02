import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { RequestWithUser } from "../../infrastruture/types";

export const authenticateToken = async (
    req: Request, // Request normal
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token not found!" });
    }

    try {
        const tokenSecret = process.env.TOKEN_SECRET ?? "secret";
        const decoded = jwt.verify(token, tokenSecret) as any;

        // aqui dizemos ao TypeScript: 'req' agora tem user'
        (req as RequestWithUser).user = decoded;

        next();
    } catch {
        return res.status(403).json({ message: "Token invalid!" });
    }
};
