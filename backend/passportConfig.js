
// import mongoose from 'mongoose';
// import passport from 'passport';
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import User from './models/user.model.js '; // Adjust the path as needed

// const opts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: 'Ghanu',
// };

// passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    
//     try {
//         const user = await User.findOne({ _id: new mongoose.Types.ObjectId(jwt_payload.id) });
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//         }
//     } catch (err) {
//         return done(err, false);
//     }
// }));

// export default passport;


import passport from 'passport';
import { adminStrategy } from './adminPassportConfig.js';
import { userStrategy } from './userPassportConfig.js';

// Register both strategies
passport.use('admin-jwt', adminStrategy);
passport.use('user-jwt', userStrategy);

export default passport;

