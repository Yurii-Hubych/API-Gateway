import express, {NextFunction, Request, Response} from 'express';
import setupLogging from "./logging/logging"
import {setupProxyWithLimits} from "./proxy/proxy";
import {ApiError} from "./errors/api.error";
import cors from "cors";
import helmet from "helmet";
import rateLimitAndTimeout from "./middleware/rate-limit-and-timeout";
import {configs} from "./configs/configs";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(helmet());
app.disable("x-powered-by");

const port = 3000;

const interval = 60 * 1000;

const requestCounts:IRequestCounts = {};

setInterval(() => {
    Object.keys(requestCounts).forEach((ip) => {
        requestCounts[ip] = 0;
    });
}, interval);

setupLogging(app);
app.use(rateLimitAndTimeout(requestCounts));
setupProxyWithLimits(app, requestCounts);

app.use((_req, res) => {
    res.status(404).json({message: "Not found"});
});

app.use((err: ApiError, req: Request, res: Response, next: NextFunction):void => {
    const status: number = err.status || 500;
    res.status(status).json({message: err.message});
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${configs.PORT_GATEWAY}`)
})