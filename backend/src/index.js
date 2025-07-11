import express from "express";
import "dotenv/config";
import { dbConnect } from "./config/dbConnect.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import chatGPTRoutes from "./routes/chatGPTRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());

app.get("/index", (req, res) => {
  return res.status(200).json({
    status: "Success",
    message:
      "Wohoo, REST APIs are working fine to build the Online Learning Mobile App",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/chatgpt", chatGPTRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  dbConnect();
});
