import dotenv from "dotenv";
import path from "path";
import webpack from "webpack";
dotenv.config();
const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";
const config: webpack.Configuration = {
  entry: {
    main: path.join(process.cwd(), "src", "client", "main.ts"),
    signup: path.join(process.cwd(), "src", "client", "signup.ts"),
    login: path.join(process.cwd(), "src", "client", "login.ts"),
    unauthenticatedlanding: path.join(process.cwd(), "src", "client", "unauthenticatedlanding.ts"),
    userlobby: path.join(process.cwd(), "src", "client", "userlobby.ts"),
    guestlobby: path.join(process.cwd(), "src", "client", "guestlobby.ts"),
    creategame: path.join(process.cwd(), "src", "client", "creategame.ts"),
    joingame: path.join(process.cwd(), "src", "client", "joingame.ts"),
    gameend: path.join(process.cwd(), "src", "client", "gameend.ts"),
    game: path.join(process.cwd(), "src", "client", "game.ts"),
  },
  mode,
  output: {
    path: path.join(process.cwd(), "src", "public", "js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
export default config;
