import db from "../server/db/connection";

async function testDatabaseConnection() {
  try {
    const obj = await db.connect(); // Wait for the connection
    console.log("Connection successful!");
    obj.done(); // Close the connection
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

testDatabaseConnection();
export default testDatabaseConnection;
