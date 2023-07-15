import express from "express";
import path, { join } from "path";
import ejs from "ejs";
import url from "url";

import authRoute from "./routes/authRoute.js";
import { place } from "./data.js";
import productModel from "./models/productModel.js";

import connectDB from "./config/db.js";
import productDB from "./config/productDB.js";
import { requireSignIn } from "./middleware/authMiddleware.js";

const app = express();
const __dirname = url.fileURLToPath(new url.URL(".", import.meta.url));

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(join(__dirname, "public")));
connectDB();
productDB();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Set the views directory

// Set up your routes
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/reserve", requireSignIn, (req, res) => {
  res.render("cheack");
});
app.get("/welcome", (req, res) => {
  res.render("welcomePage");
});
app.get("/city", (req, res) => {
  res.render("city", { place });
});

app.get("/cart", async (req, res) => {
  const product = await productModel.find({});

  res.render("cart", {
    title: "this is product page",
    product: product,
  });
});

// cart route

app.use("/api", authRoute);

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
