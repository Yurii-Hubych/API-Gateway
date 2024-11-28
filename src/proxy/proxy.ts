import {createProxyMiddleware} from "http-proxy-middleware";
import {services} from "../services/services";
import rateLimitAndTimeout from "../middleware/rate-limit-and-timeout";

export const setupProxyWithLimits = (app: any, requestCounts: IRequestCounts) => {
    services.forEach(({route, target}) => {
        const proxyOptions = {
            target: target,
            changeOrigin: true,
            cookieDomainRewrite: "localhost:5173",
            secure: false,
            pathRewrite: {
                [`^${route}`]: "",
            }
        };

        app.use(
            route,
            rateLimitAndTimeout(requestCounts),
            createProxyMiddleware(proxyOptions)
        );
    });
};