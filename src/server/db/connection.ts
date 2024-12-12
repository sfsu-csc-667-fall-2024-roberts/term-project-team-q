const pgp = require("pg-promise")();
const connection = pgp(process.env.DATABASE_URL);

console.log("Connection to the database is successful.");

export default connection;
