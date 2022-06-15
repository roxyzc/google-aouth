import passport from "passport";
import { Strategy } from "passport-google-oauth2";
import User from "../models/user.model.js";
import { config } from "dotenv";
config(); 

passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
    const findUser = await User.findOne({googleId: profile.id})
    if(findUser) return done(null, findUser);
    const user = new User({googleId: profile.id, username: profile.displayName, profile: profile.picture, email: profile.email});
    user.save().then(() => {return done(null, user)}).catch(() => console.log("error"));
}));

passport.serializeUser((user, done) =>{
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


