import cors from "cors";
import express from "express";
import data from "./data.js";
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
