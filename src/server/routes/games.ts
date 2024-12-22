import express from "express";
const router = express.Router();
import { createGame, joinGame, leaveGame, getGameState } from "../db/games";


router.get("/creategame", (request, response) => {
    createGame(request, response);
    response.render("creategame", { title: "Create Game" });
  });
  
  router.post("/joingame", (request, response) => {
    joinGame(request, response);
    response.render("joingame", { title: "Join Game" });
  });

  router.get("/gamestart", (request, response) => {
    
  });

  router.post("/leavegame", (request, response) => {
    leaveGame(request, response);
    response.render("leavegame", { title: "Leave Game" });
  });
  
  router.get("/gameend", (request, response) => {
    response.render("gameend", { title: "Game End" });
  });
  
  router.get("/game", (request, response) => {
    response.render("game", { title: "Game Page" });
  });


  router.get("/gamestate", (request, response) => {
    response.send(getGameState(request, response));
  })

export default router;