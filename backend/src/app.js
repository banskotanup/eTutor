const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const subjectRouter = require("./routes/subject.routes");
const lessonRouter = require("./routes/lesson.routes");
const assignmentRouter = require("./routes/assignment.routes");
const submissionRouter = require("./routes/submission.routes");
const liveClassRouter = require("./routes/liveclass.routes");
const attendanceRouter = require("./routes/attendance.routes");
const paymentRouter = require("./routes/payment.routes");
const salaryRouter = require("./routes/salary.routes");
const notificationRouter = require("./routes/notification.routes");
const messageRouter = require("./routes/message.routes");
const contactRouter = require("./routes/contact.routes");

//route testing
const testRouter = require("./routes/test.routes");

//cors
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.1.73:3000"],
    credentials: true,
    methods: "GET,POST,PUT,PATCH,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.get("/", (req, res) => {
    res.send("LMS BACKEND RUNNING...");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/lessons", lessonRouter);
app.use("/api/v1/assignments", assignmentRouter);
app.use("/api/v1/submission", submissionRouter);
app.use("/api/v1/live-class", liveClassRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/salary", salaryRouter);
app.use("/api/v1/notification", notificationRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/contact-us", contactRouter);

//route testing
app.use("/test", testRouter);

const port = process.env.PORT;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running at ${port}`);
});