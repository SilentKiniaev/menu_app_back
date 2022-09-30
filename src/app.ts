import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import router from "./routes";
import { initCloudiary } from "./cloudinary";

dotenv.config();
initCloudiary();

const app: Express = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT || 3000, () => console.log("Server started"));
