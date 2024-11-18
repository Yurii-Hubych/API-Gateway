import {config} from "dotenv";

config();

export const configs = {
    PORT_GATEWAY: process.env.PORT_GATEWAY || "3000",
}