import express from "express";
const router = express.Router();

router.get("/", (_request, response) => {
    response.render("userlobby", { title: "Lobby" });
  });
router.get("/userlobby", (_request, response) => {
    response.render("userlobby", { title: "User Lobby" });
  });
  
  router.get("/guestlobby", (_request, response) => {
    response.render("guestlobby", { title: "Guest Lobby" });
  });

  export default router;