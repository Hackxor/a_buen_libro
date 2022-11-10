const passport = require("passport");

exports.autenticar = passport.authenticate('local',{
    successRedirect : '/si',
    failureRedirect : '/no'
})