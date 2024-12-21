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
import authenticationMiddleware from "./middleware/authentication";
import * as path from "path";
import * as routes from "./routes/root";
import * as configuration from "./config/config";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const staticPath = path.join(process.cwd(), "src", "public");
app.use(express.static(staticPath));
configuration.configureLiveReload(app, staticPath);

configuration.configureSession(app);


app.use(cookieParser());
app.set("views", path.join(process.cwd(), "src", "server", "views"));
app.set("view engine", "ejs");

app.use("/", routes.home);
app.use("/lobby", authenticationMiddleware, routes.lobby);
app.use("/auth", routes.auth);
app.use("/games", authenticationMiddleware, routes.games);
app.use("/test", routes.test);

app.use((_request, _response, next) => {
  next(httpErrors(404));
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
