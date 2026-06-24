import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/expenses", expenseRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("ConvertCart API is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
