// app.js
const express = require("express");

const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");
const orderRoutes = require("./routes/order");
const reviewRoutes = require("./routes/review");
const couponRoutes = require("./routes/coupon");
const discountRoutes = require("./routes/discount");
const cartRoutes = require("./routes/cart");
const favoriteRoutes = require("./routes/favorite");
const sellerRoutes = require("./routes/seller");
const settlementRoutes = require("./routes/settlement");

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