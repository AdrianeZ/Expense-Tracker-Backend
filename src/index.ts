import express from "express";
import cors from "cors";
import "express-async-errors";
import rateLimit from "express-rate-limit";
import {errorMiddleware} from "./middlewares/ErrorMiddleware"

const app = express();

app.use(rateLimit({max: 100, windowMs: 1000 * 60 * 15})); // max 100 requests for every 15min

app.use(cors({
        origin: "http://localhost:3000"
    }
));

app.use(express.json());

app.use(errorMiddleware);


app.listen(Number(process.env.APP_PORT), "0.0.0.0", () => console.log(`Listening on port http://localhost:${process.env.APP_PORT}`));


