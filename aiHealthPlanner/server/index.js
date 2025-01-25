//imports:
import cors from "cors";
import express from "express";
import router from "./routes/index.js";
import dotenv from "dotenv";
//constants:
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/", router);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
