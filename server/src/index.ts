import express, { Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import { handleRefresh } from "./controllers/auth/refresh-controllers";
import JWTMiddleware from "./middleware/jwt-middleware";
import AuthRoutes from "./routes/auth-routes";
import StoreRoutes from "./routes/store-routes";
import StoreIDRoutes from "./routes/storeId-routes";
import UploadRoutes from "./routes/upload-routes";
import path from "path";

dotenv.config();

const app: Application = express();

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174","http://localhost:4173"],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// routes for api
app.use("/api/auth", AuthRoutes);
app.get("/api/refresh", handleRefresh);
app.use("/api", JWTMiddleware, StoreRoutes);
app.use("/api/:storeId", JWTMiddleware, StoreIDRoutes);
app.use("/api/uploads", JWTMiddleware, UploadRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
