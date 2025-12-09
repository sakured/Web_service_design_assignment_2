const express = require('express');

const http = require("http");
const app = require("./app");
const PORT = 3000;

const server = http.createServer(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});