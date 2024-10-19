import express, { Application } from "express";

import authRoutes from "./routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app: Application = express();

const port = process.env.PORT || 8001;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());

app.use("/auth", authRoutes);

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
