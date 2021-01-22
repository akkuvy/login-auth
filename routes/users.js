var express = require("express");
var router = express.Router();
var messagebird = require('messagebird')("")
const passport=require('passport')
var gauth=require('../config/auth')


router.get("/", function (req, res, next) {
  res.render("index");
});

module.exports = router;
router.get("/otp-login", (req, res) => {
  res.render("otp-login");
});
router.post("/send-otp", (req, res) => {
  var number = req.body.number;
  messagebird.verify.create(
    number,
    {
      originator: "Code",
      template: "Your verification code is %token.",
    },
    function (err, response) {
      if (err) {
        console.log(err);
        res.render("otp-login", {
          error: err.errors[0].description,
        });
      } else {
        console.log(response);
        res.render("otp-send", {
          id: response.id,
        });
      }
    }
  );
});
router.post('/confirm-otp',(req,res)=>{
  var id = req.body.id;
  var token = req.body.token;
  messagebird.verify.verify(id, token, function(err, response) {
    if (err) {
      console.log(err);
      res.render('otp-send', {
        error: err.errors[0].description,
        id: id,
      });
    } else {
      console.log(response);
      res.render('dashboard');
    }
  });
})
router.get("/failed", (req, res) => res.send("You Failed to log in!"));

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
  console.log(req.user);
  res.render('dashboard')
  })
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/dashboard',
                                      failureRedirect: '/' }));
                                      app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: 'read_stream' })
);
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['read_stream', 'publish_actions'] })
);