import express from "express";
const router = express.Router();
router.get("/", (_request, response) => {
  response.render("root", { title: "Jrob's site" });
});
router.get("/signup", (_request, response) => {
  response.render("signup", { title: "Sign Up" });
}); //

router.get("/login", (_request, response) => {
  response.render("login", { title: "Login" });
});

router.get("/unauthenticatedLanding", (_request, response) => {
  response.render("unauthenticatedLanding", { title: "Unauthenticated Landing Page" });
});

router.get("/userlobby", (_request, response) => {
  response.render("userlobby", { title: "User Lobby" });
});

router.get("/guestlobby", (_request, response) => {
  response.render("guestlobby", { title: "Guest Lobby" });
});

router.get("/creategame", (_request, response) => {
  response.render("creategame", { title: "Create Game" });
});

router.get("/joingame", (_request, response) => {
  response.render("joingame", { title: "Join Game" });
});

router.get("/gameend", (_request, response) => {
  response.render("gameend", { title: "Game End" });
});

router.get("/game", (_request, response) => {
  response.render("game", { title: "Game Page" });
});
export default router;

/*
SignUp
Login
Unauthenticated main page
UserLobby
GuestLobby
Create Game
Join Game
GameEnd
GamePage
*/