import express from "express";
const router = express.Router();

router.get("/", (_request, response) => {
  response.render("root", { title: "Jrob's site" });
});
router.get("/unauthenticatedLanding", (_request, response) => {
  response.render("unauthenticatedLanding", {
    title: "Unauthenticated Landing Page",
  });
});

export default router;
