import express from "express";
import { Users } from "../db";

const router = express.Router();

router.post("/register", async (request, response) => {
  const { username, email, password } = request.body;
  try {
    const user = await Users.register(username, email, password);
    // @ts-ignore
    request.session.user = user;
    response.send(user);
  } catch (error) {
    console.error(error);
    // request.flash("error", "Failed to register user");
    if (error.message === "User already exists") {
      response.send("User already exists");
    } else {
    }
    response.redirect("/");
  }
});
router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await Users.login(email, password);

    // @ts-ignore
    request.session.user = user;
    // return user details
    response.send(user);
    // response.redirect("/");
  } catch (error) {
    console.error(error);
    if (error.message === "Invalid credentials provided") {
      response.send("Invalid credentials provided");
    } else {
      response.send("Failed to login");
    }
  }
});

router.get("/logout", (request, response) => {
  request.session.destroy(() => {
    response.redirect("/");
  });
});

router.get("/signup", (_request, response) => {
  response.redirect("/auth/register");
});

// router.get("/login", (_request, response) => {
//   response.render("auth/login", { title: "Login" });
// });
export default router;
