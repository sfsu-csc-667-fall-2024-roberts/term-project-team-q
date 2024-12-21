import connectPgSimple from "connect-pg-simple";
import { Express, RequestHandler } from "express";
import flash from "express-flash";
import session from "express-session";
import { Pool } from "pg";

// Create a PostgreSQL connection pool
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "CSC667Database",
  user: "postgres",
  password: "12345",
});

let sessionMiddleware: RequestHandler | undefined = undefined;

declare module "express-session" {
  interface SessionData {
    user: string;
  }
}

export default (app: Express): RequestHandler | undefined => {
  if (sessionMiddleware === undefined) {
    sessionMiddleware = session({
      store: new (connectPgSimple(session))({
        pool: pool, // Provide the PostgreSQL connection pool
        createTableIfMissing: true, // Ensure the session table is created
        tableName: "session", // Name of the table in the database
      }),
      secret: process.env.SESSION_SECRET!, // Use your session secret
      resave: false, // Avoid resaving unchanged sessions
      saveUninitialized: false, // Don't save uninitialized sessions
      cookie: {
        secure: process.env.NODE_ENV === "production", // Set to true in production
        httpOnly: true, // Ensure cookies are only sent over HTTP(S)
        maxAge: 3600000, // Session expires after 1 hour
      },
    });

    app.use(sessionMiddleware);
    app.use(flash());
  }

  return sessionMiddleware;
};

// import connectPgSimple from "connect-pg-simple";
// import type { Express, RequestHandler } from "express";
// import flash from "express-flash";
// import session from "express-session";

// let sessionMiddleware: RequestHandler | undefined = undefined;

// declare module 'express-session' {
//   interface SessionData {
//     user: string;
//   }
// }

// export default (app: Express): RequestHandler | undefined => {
//   if (sessionMiddleware === undefined) {
//     sessionMiddleware = session({
//       store: new (connectPgSimple(session))({
//         createTableIfMissing: true,
//       }),
//       secret: process.env.SESSION_SECRET!,
//       resave: true,
//       saveUninitialized: true,
//     });
//     app.use(sessionMiddleware);
//     app.use(flash());
//   }
//   return sessionMiddleware;
// };
