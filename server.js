import express from "express";
import mongoose from "mongoose"; //ODM library for Node/MongoDB
import dotenv from "dotenv";
import "express-async-errors"; //passes on errors to our error handler middleware w/o using try/catch and next
import morgan from "morgan"; //HTTP request logger

//static assets imports
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//security middleware
import helmet from "helmet";
import xssClean from "xss-clean";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 50, // Limit each IP to 50 requests per `window`
  message: "Too many requests from this IP address, please try again later",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

//routers
import authRouter from "./routes/authRouter.js";
import favsRouter from "./routes/favsRouter.js";

//middleware
import notFoundMiddleware from "./middleware/notFound.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";
import authenticateUser from "./middleware/auth.js";

const app = express();
dotenv.config();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(express.json());
app.use(limiter);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": [
        "'self'",
        "https://waterservices.usgs.gov",
        "https://nominatim.openstreetmap.org/",
      ],
      "img-src": [
        "'self'",
        "data:",
        "https://a.tile.openstreetmap.org/",
        "https://b.tile.openstreetmap.org/",
        "https://c.tile.openstreetmap.org/",
      ],
    },
  })
);
app.use(xssClean());
app.use(hpp());
app.use(mongoSanitize());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/favs", authenticateUser, favsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

const connectDB = (uri) => {
  return mongoose.connect(uri);
};

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
