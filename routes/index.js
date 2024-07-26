var express = require('express');
var router = express.Router();
const userModel = require('./users');
const postModel = require('./posts');
const passport=require('passport');
const localStrategy=require("passport-local");
passport.authenticate(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/register",function(req,res){
  const { username, email, fullName } = req.body;
const userData = new userModel({ username, email, fullName });
userModel.register(userData,req.body.password)
.then(function(){
  passport.authenticate("local")(req,res,function(){
    res.redirect("/profile");
  })
})
})
router.post("/login",passport.authenticate("local,succfunction(req,res){
  
})
module.exports = router;
