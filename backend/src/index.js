import express from "express";
import "dotenv/config";

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

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
