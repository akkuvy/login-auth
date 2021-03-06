const express=require('express')
const passport = require("passport");
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
 var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: ,
    clientSecret: ,
    callbackURL: "http://www.example.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate( function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(new GoogleStrategy({
  clientID:    "",
  clientSecret: "",
  callbackURL: "http://localhost:3000/google/callback",
  passReqToCallback   : true
},
function (request, accessToken, refreshToken, profile, done) {
  console.log(profile);

  return done(null, profile);
}
));
