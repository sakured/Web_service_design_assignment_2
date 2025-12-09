// app.js
const express = require("express");
const userRoutes = require("./controllers/userController");
const bookRoutes = require("./controllers/bookController");
const orderRoutes = require("./controllers/orderController");
const reviewRoutes = require("./controllers/reviewController");
const couponRoutes = require("./controllers/couponController");
const discountRoutes = require("./controllers/discountController");
const cartRoutes = require("./controllers/cartController");
const favoriteRoutes = require("./controllers/favoriteController");
const sellerRoutes = require("./controllers/sellerController");
const settlementRoutes = require("./controllers/settlementController");

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/orders", orderRoutes);
app.use("/reviews", reviewRoutes);
app.use("/coupons", couponRoutes);
app.use("/discounts", discountRoutes);
app.use("/carts", cartRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/sellers", sellerRoutes);
app.use("/settlements", settlementRoutes);


module.exports = app;