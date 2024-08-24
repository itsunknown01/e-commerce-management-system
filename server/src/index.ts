import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";

import AuthRoutes from "./routes/auth-routes";
import { handleRefresh } from "./controllers/auth/refresh-controllers";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

// routes for api
app.use("/api/auth", AuthRoutes);
app.get("/api/refresh", handleRefresh)
app.get("/api/data",(req,res) => {
  const data = {
    name: "Neha"
  }

  res.json({data})
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});