import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdProducts });
});

export default router;
