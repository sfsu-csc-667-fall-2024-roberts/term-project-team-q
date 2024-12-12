import express from "express";
const router = express.Router();

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