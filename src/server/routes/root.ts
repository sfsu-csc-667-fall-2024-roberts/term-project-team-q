import express from "express";
const router = express.Router();

export { default as games } from "./games";
export { default as lobby } from "./lobby";
export { default as home } from "./home";
export { default as auth } from "./auth";
export { default as test } from "./test";

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
