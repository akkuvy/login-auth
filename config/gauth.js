const express=require('express')
const passport = require("passport");
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(new GoogleStrategy({
  clientID:    "1080061621503-cuhcsqatsm4vc6g454nbu8rs4mrsv69m.apps.googleusercontent.com",
  clientSecret: "sq-Z1-eVfvYd0jT7I2wgTH1B",
  callbackURL: "http://localhost:3000/google/callback",
  passReqToCallback   : true
},
function (request, accessToken, refreshToken, profile, done) {
  console.log(profile);

  return done(null, profile);
}
));
