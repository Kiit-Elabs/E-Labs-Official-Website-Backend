import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth-route.js";
import eventRouter from "./routes/event-route.js";
import feedbackRoute from "./routes/feedback-route.js";
import memberRoute from "./routes/member-route.js";
import testRoute from "./routes/test-route.js";

import cors from "cors";
import { connect } from "./db/connect.js";
import {
  getCreateSessionCookie,
  getDeleteSessionCookie,
  validateSessionToken,
} from "./lib/auth.js";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

dotenv.config();

connect();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// auth middleware
app.use(async (req, res, next) => {
  const token = req.cookies.session;
  if (token === null) {
    res.locals.user = null;
    res.locals.session = null;
    return next();
  }

  const { session, user } = await validateSessionToken(token);

  if (session === null) {
    res.appendHeader("Set-Cookie", getDeleteSessionCookie());
    res.locals.session = null;
    res.locals.user = null;
    return next();
  }
  res.appendHeader(
    "Set-Cookie",
    getCreateSessionCookie(token, session.expires_at)
  );
  res.locals.session = session;
  res.locals.user = user;
  return next();
});

app.listen(8000 || process.env.PORT, () =>
  console.log("SERVER STARTED " + (process.env.PORT || 8000))
);

app.use("/auth", authRouter);
app.use("/test", testRoute);

app.use("/events", eventRouter);

app.use("/feedback", feedbackRoute);
app.use("/member", memberRoute);
