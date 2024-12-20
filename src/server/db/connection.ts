import pgp from "pg-promise";
import dotenv from "dotenv";

dotenv.config();
const pgpInstance = pgp();

const connection = pgpInstance({
  host: "localhost",
  port: 5432,
  database: "CSC667Database",
  user: "postgres",
  password: "12345",
});

export default connection;
