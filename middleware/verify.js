const passport = require("passport");


async function verify(req, res, next) {
    try {
        passport.authenticate('jwt', { session: false }, async function (err, userdata) {
            if (err) {
                return next(err);
            }
            if (userdata === false) {
                return res.status(403).json({ message: "please authnticate your self" });
            }
            req.user = userdata;
            return next();

        })(req, res, next);
    }
    catch (err) {
        console.log("error from user middleware", e);
        return next()
    }

}

module.exports = {
    verify
}