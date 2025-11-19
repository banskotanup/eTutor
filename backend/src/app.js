const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const app = express();

const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const subjectRouter = require("./routes/subject.routes");
const lessonRouter = require("./routes/lesson.routes");
const assignmentRouter = require("./routes/assignment.routes");
const submissionRouter = require("./routes/submission.routes");

//route testing
const testRouter = require("./routes/test.routes");


app.get("/", (req, res) => {
    res.send("LMS BACKEND RUNNING...");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/lessons", lessonRouter);
app.use("/api/v1/assignments", assignmentRouter);
app.use("/api/v1/submission", submissionRouter);

//route testing
app.use("/test", testRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at ${port}`);
});