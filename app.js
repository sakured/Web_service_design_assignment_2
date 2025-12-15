// app.js
require("dotenv").config();
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
const authRoutes = require("./routes/auth");
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

const { swaggerUi, swaggerSpec } = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
app.use("/", authRoutes);

// Root
app.get("/", (req, res) => {
    res.json({ message: "Welcome on the bookstore API" });
});

// health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    name: "api",
    version: process.env.npm_package_version || "unknown",
    node: process.version,
    env: process.env.NODE_ENV || "production",
    buildTime: process.env.BUILD_TIME || null,
    uptime: process.uptime()
  });
});

// Middleware for routes not found
app.use((req, res, next) => {
    const err = new Error('Resource not found');
    err.status = 404;
    err.code = 'RESOURCE_NOT_FOUND';
    next(err);
});


// Middlewares
app.use(errorHandler);

module.exports = app;