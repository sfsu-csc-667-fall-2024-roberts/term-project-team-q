import express from "express";
const router = express.Router();

import testDatabaseConnection from "../testingcode";

router.get("/", (_request, response) => {
  console.log("test working");
  testDatabaseConnection();
  response.send("Test route working");
});

export default router;
