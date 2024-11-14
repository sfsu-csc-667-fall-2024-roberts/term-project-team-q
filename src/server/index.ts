// import express from "express";
// import httpErrors from "http-errors";
// import rootRoutes from "./routes/root";
// import { timeMiddleware } from "./middleware/time";
// import * as path from "path";
// import morgan from "morgan";
// import cookieParser from "cookie-parser";

// dotenv.config();

// const app = express();
// app.use(morgan("dev"));
// const PORT = process.env.PORT || 3000;
// app.use(timeMiddleware);

// app.use(express.static(
//     path.join(process.cwd(), "src", "public"))
//    );
//    app.set(
//     "views",
//     path.join(process.cwd(), "src", "server", "views")
//    );
//    app.set("view engine", "ejs");
//    app.use("/", rootRoutes);
// app.listen(PORT, () => {
//  console.log(`Server is running on port ${PORT}`);
// });

// app.use((_request, _response, next) => {
//     next(httpErrors(404));
//    });

import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import httpErrors from "http-errors";
import morgan from "morgan";
import connectLiveReload from "connect-livereload";
import livereload from "livereload";
import * as path from "path";
import rootRoutes from "./routes/root";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const staticPath = path.join(process.cwd(), "src", "public");
app.use(express.static(staticPath));

if (process.env.NODE_ENV === "development") {
  const reloadServer = livereload.createServer();
  reloadServer.watch(staticPath);
  reloadServer.server.once("connection", () => {
  setTimeout(() => {
  reloadServer.refresh("/");
  }, 100);
  });
  app.use(connectLiveReload());
 }

app.use(cookieParser());
app.set("views", path.join(process.cwd(), "src", "server", "views"));
app.set("view engine", "ejs");
app.use("/", rootRoutes);
app.use((_request, _response, next) => {
  next(httpErrors(404));
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
