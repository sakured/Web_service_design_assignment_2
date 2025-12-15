require("dotenv").config();

const express = require("express");
const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const server = http.createServer(app);

server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});