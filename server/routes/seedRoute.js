import express from "express";
import User from "../models/userModel";
const router = express.Router();

router.get("/", async (req, res) => {
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(data.products);
});

export default router;
