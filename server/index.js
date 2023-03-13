import cors from "cors";
import express from "express";
import data from "./data.js";
const app = express();
const port = process.env.PORT || 5000;

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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
