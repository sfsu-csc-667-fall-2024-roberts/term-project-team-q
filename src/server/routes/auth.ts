import express from "express";
import { Users } from "../db";
import { User } from "../db/users";
const router = express.Router();

router.post("/register", async (request, response) => {
  const { username, email, password } = request.body;
  try {
    const user = await Users.register(username, email, password);
    // @ts-ignore
    request.session.user = user;
    response.redirect("/lobby");
  } catch (error) {
    console.error(error);
    // request.flash("error", "Failed to register user");
    response.redirect("/auth/register");
  }
});
router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await Users.login(email, password);

    // @ts-ignore
    request.session.user = user;
    response.redirect("/lobby");
  } catch (error) {
    console.error(error);

    response.redirect("/auth/login");
  }
});

router.get("/logout", (request, response) => {
  request.session.destroy(() => {
    response.redirect("/");
  });
});

// router.get("/signup", (_request, response) => {
//   response.render("auth/signup", { title: "Sign Up" });
// });

// router.get("/login", (_request, response) => {
//   response.render("auth/login", { title: "Login" });
// });
export default router;
