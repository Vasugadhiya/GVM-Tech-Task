var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
const passport = require('passport');
const user = require("../model/usermodel")
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    const userdata = await user.findOne({_id: jwt_payload._id })
    if (userdata) {
        return done(null, userdata);
    } else {
        return done(null, false);
    }
}));