import express from "express";
import { config } from "dotenv";
import { dbConnect } from "./utils/dbConnect.js";
import passport from "passport";
import session from "express-session";
import User from "./models/user.model.js";

config();
dbConnect();

import "./utils/passport.js"

const app = express();
app.use(express.json());
app.use(session({secret: "cats"}));
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next){
    req.user? next() : res.sendStatus(403);
}

app.get('/', (req, res) => {
    res.send(`<a href="/auth/google">Login</a>`)
})

app.get("/user", async (req, res) => {
    const user = await User.find();
    res.send(user);
})

app.get("/auth/google", passport.authenticate("google", {scope: ["email", "profile"]}));

app.get("/google/callback", passport.authenticate("google", {successRedirect: "/protected", failureRedirect: "/auth/failure"}))

app.get("/auth/failure", (req, res) => {
    res.send("something went wrong...");
});

app.get("/protected", isLoggedIn, async (req, res) => {
    console.log(req.user)
    const user = await User.findOne({googleId: req.user.googleId});
    res.send(user);
});

app.get("/delete/:id", async(req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
});

app.get("/logout", (req, res) => {
    req.logout(async err => {
        if(err) return err;
        req.session.destroy();
        res.redirect("/");
    });
});
app.listen(process.env.PORT, () => {
    console.log(`Listening at port ${process.env.PORT}`);
});


