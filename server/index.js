import cors from "cors";
import envConfig from "dotenv";
import express from "express";
import dbConnect from "./config/db.js";
import data from "./data.js";
import Product from "./models/product.model.js";
const app = express();
const port = process.env.PORT || 5000;
envConfig.config();

// Middleware
app.use(cors());

// Routes
app.get("/api/seed", async (req, res) => {
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdProducts });
});

app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

//Get single product
app.get("/api/products/slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

//Get single product
app.get("/api/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
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
