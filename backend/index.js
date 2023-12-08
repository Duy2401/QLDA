const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");
const projectRouter = require("./routers/project");
const departmentRouter = require("./routers/department");
const taskRouter = require("./routers/taks");
dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URL_CONNECT, () => {
  console.log("CONNECT SUCCESS TO MONGODB");
});
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/v1/user", userRouter);
app.use("/v1/auth", authRouter);
app.use("/v1/department", departmentRouter);
app.use("/v1/project", projectRouter);
app.use("/v1/task", taskRouter);

app.listen(8000, () => {
  console.log("Server is running");
});
