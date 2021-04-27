import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/google/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/error" }), (req, res) => {
    res.redirect("/");
  }
);

router.get("/error", (req, res) => res.send("Unknown Error"));

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/auth/error" }), (req, res) => {
  res.redirect("/");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

export default router;
