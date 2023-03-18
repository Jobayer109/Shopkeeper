import bcrypt from "bcryptjs";
import cors from "cors";
import envConfig from "dotenv";
import express from "express";
import expressAsyncHandle from "express-async-handler";
import dbConnect from "./config/db.js";
import data from "./data.js";
import Product from "./models/product.model.js";
import User from "./models/userModel.js";
import generateToken from "./utils.js";
const app = express();
const port = process.env.PORT || 5000;
envConfig.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/api/seed", async (req, res) => {
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(data.products);

  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdProducts, createdUsers });
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

// User sign in
app.post(
  "/api/user/signIn",
  expressAsyncHandle(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

// Server Error Handling
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
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
