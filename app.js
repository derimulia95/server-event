const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const usersRouter = require("./app/api/v1/users/router");
const authRouter = require("./app/api/v1/auth/router");
const categoryRouter = require("./app/api/v1/category/router");
const speakerRouter = require("./app/api/v1/speakers/router");
const eventRouter = require("./app/api/v1/events/router");
const paymentRouter = require("./app/api/v1/payments/router");
const participantRouter = require("./app/api/v1/participants/router");
const transactionRouter = require("./app/api/v1/transactions/router");

//midleware
const notFoundMiddleware = require("./app/middlewares/not-found");
const errorHandlerMiddleware = require("./app/middlewares/handler-error");

const app = express();

const versionV1 = "/api/v1";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// app.use("/", (req, res) => {
//   res.json({ message: "welcom to api" });
// });
app.use(`${versionV1}`, usersRouter);
app.use(`${versionV1}/auth`, authRouter);
app.use(`${versionV1}/category`, categoryRouter);
app.use(`${versionV1}/speaker`, speakerRouter);
app.use(`${versionV1}/event`, eventRouter);
app.use(`${versionV1}/payment`, paymentRouter);
app.use(`${versionV1}/participant`, participantRouter);
app.use(`${versionV1}/transaction`, transactionRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
