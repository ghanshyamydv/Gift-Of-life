// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
// import User from "./models/user.model.js"; // Ensure this path is correct
// import bcrypt, { compareSync } from "bcrypt"; // Needed for password comparison

// passport.use(
//   new LocalStrategy(async (username, password, done) => {
//     try {
//       const user = await User.findOne({ username });
//       if (!user) {
//         return done(null, false, { message: "Incorrect username" });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);
//       // const isMatch = await user.comparePassword(password);
//       if (!isMatch) {
//         return done(null, false, { message: "Incorrect password" });
//       }

//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   })
// );

// // Serialize and deserialize user (Needed for session support)
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

// export default passport;
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from './models/user.model.js '; // Adjust the path as needed

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'Ghanu',
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    
    try {
        const user = await User.findOne({ _id: new mongoose.Types.ObjectId(jwt_payload.id) });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));

export default passport;



