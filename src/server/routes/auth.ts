import express from "express";
const router = express.Router();

router.get("/signup", (_request, response) => {
  response.render("auth/signup", { title: "Sign Up" });
});

router.get("/login", (_request, response) => {
  response.render("auth/login", { title: "Login" });
});
export default router;
