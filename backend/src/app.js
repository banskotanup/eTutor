const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const app = express();
app.get("/", (req, res) => {
    res.send("Hello");
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at ${port}`);
});