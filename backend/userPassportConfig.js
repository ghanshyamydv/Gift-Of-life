import mongoose from 'mongoose';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from './models/user.model.js';

const userOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'Ghanu',
};

export const userStrategy = new JwtStrategy(userOpts, async (jwt_payload, done) => {
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
});
