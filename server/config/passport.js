let JwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models").user;

module.exports = (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.PASSPORT_SECRET;

  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      try {
        console.log(jwt_payload);
        // jwt_payload是透過jwt token拿回使用者的資料，其中含有_id, email, username...
        let foundUser = await User.findOne({ _id: jwt_payload._id }).exec();
        if (foundUser) {
          return done(null, foundUser); // req.user <= 將foundUser塞進req.user
        } else {
          return done(null, false);
        }
      } catch (e) {
        return done(e, false);
      }
    })
  );
};
