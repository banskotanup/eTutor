const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const app = express();

const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRouter = require("./routes/auth.routes");


app.get("/", (req, res) => {
    res.send("LMS BACKEND RUNNING...");
});

app.use("/api/v1/auth", authRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at ${port}`);
});