var express = require('express');
var router = express.Router();
const userModel = require('./users');
const postModel = require("./posts");
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const upload = require('./multer');

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render("login", { error: req.flash('error') });
});

router.get('/feed', function(req, res, next) {
  res.render("feed");
});

router.post('/upload',isLoggedIn, upload.single("file"), async function(req, res, next) {
  if (!req.file) {
    return res.status(400).send("No files were given");
  }

  const user = await userModel.findOne({ username: req.session.passport.user });

  const postdata = await postModel.create({
    image: req.file.filename,
    imageText: req.body.filecaption,
    user: user._id
  });

  user.posts.push(postdata._id); // Corrected variable name
  await user.save();
  res.send("done");
});

router.get('/profile', isLoggedIn, async function(req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user
  });
  console.log(user);
  res.render("profile", { user });
});

router.post("/register", function(req, res) {
  const { username, email, fullName, password } = req.body;
  const userData = new userModel({ username, email, fullName });

  userModel.register(userData, password)
    .then(function() {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/profile");
      });
    })
    .catch(function(err) {
      console.log(err);
      res.redirect('/register'); // Optionally add flash message for error
    });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true
}));

router.get("/logout", function(req, res, next) {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
