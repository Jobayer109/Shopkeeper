import cors from "cors";
import envConfig from "dotenv";
import express from "express";
import dbConnect from "./config/db.js";
import data from "./data.js";
const app = express();
const port = process.env.PORT || 5000;
envConfig.config();

// Middleware
app.use(cors());

// Get all products
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

//Get single product
app.get("/api/products/slug/:slug", (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

//Get single product
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

// Server start

const serverRun = async () => {
  try {
    await dbConnect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

serverRun();
