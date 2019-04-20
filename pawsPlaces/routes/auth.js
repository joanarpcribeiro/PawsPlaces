const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/sign-in", (req, res, next) => {
  res.render("paws/sign-in", { "message": req.flash("error") });
});

router.post("/sign-in", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/paws/sign-in",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/sign-up", (req, res, next) => {
  res.render("paws/sign-up");
});

router.post("/sign-up", (req, res, next) => {
  console.log('wat');
  const username = req.body.username;
  const password = req.body.password;
  // const role = req.body.role;
  if (username === "" || password === "") {
    // console.log("fora do if")
    res.render("paws/sign-up", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("paws/sign-up", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
    });

    newUser.save()
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        res.render("paws/sign-up", { message: "Something went wrong" });
      })
  });
});

router.get("/sign-out", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
