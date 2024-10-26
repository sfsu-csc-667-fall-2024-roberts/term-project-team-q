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
import * as path from "path";
import rootRoutes from "./routes/root";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(process.cwd(), "src", "public")));
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
