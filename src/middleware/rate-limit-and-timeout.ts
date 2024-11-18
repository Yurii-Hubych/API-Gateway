import {Response, Request, NextFunction} from "express";
import {ApiError} from "../errors/api.error";

export default function rateLimitAndTimeout (requestCounts: IRequestCounts) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const ip = req.ip;
            const rateLimit = 100;
            if (!ip){
                throw new ApiError("Invalid IP address.", 400);
            }
            requestCounts[ip] = (requestCounts[ip] || 0) + 1;

            if (requestCounts[ip] > rateLimit) {
                throw new ApiError("Rate limit exceeded.", 429);
            }

            req.setTimeout(10000, () => {
                if (!res.headersSent) {
                    throw new ApiError("Gateway timeout.", 504);
                }
            });

            next();
        }
        catch (e) {
            next(e)
        }
    }
}