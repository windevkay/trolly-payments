import express, { Application } from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@stagefirelabs/common";

import { paymentsRouter } from "./routes/payments.route";

const app: Application = express();
// allows proxys through ingress-NGINX
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test", // only send over https
  })
);
// check jwt token availability
app.use(currentUser);

app.use("/api/payments", paymentsRouter);

// handle unknown routes
app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
