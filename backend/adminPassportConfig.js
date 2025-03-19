import mongoose from 'mongoose';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import Admin from './models/admin.model.js'; 

const adminOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'AdminGhanu',
};

export const adminStrategy = new JwtStrategy(adminOpts, async (jwt_payload, done) => {
    try {
        const admin = await Admin.findOne({ _id: new mongoose.Types.ObjectId(jwt_payload.id) });
        if (admin) {
            return done(null, admin);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
});
