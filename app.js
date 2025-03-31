if(process.env.NODE_ENV != "production"){
     require('dotenv').config();
}

console.log(process.env.SECRET);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/users.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const dburl = process.env.ATLASDB_URL;
main()
.then(() => {
    console.log("Connect to db");
})
.catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect(dburl);
}

const store = mongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret :process.env.SECRET,
    },
    touchAfter: 24 * 3600
});

store.on("error",(err)=>{
     console.log("Error in Mongo Session Store",err);
});

const sessionOption = {
    store,  
    secret : process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie :{
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true, //prevent from cross-scripting attacks 
    }
};



// app.get("/",(req,res) => {
//     res.send("hey..I am Root");
// });

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
//pbkd2 hashing algorithm
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next) => {
    // console.log("Flash Messages in Middleware:", req.flash("success"), req.flash("error"));
      res.locals.success = req.flash("success") || [];
      res.locals.error = req.flash("error") || [];
      res.locals.currUser = req.user || null;
      next();
});

app.use("/listing",listingRouter);
app.use("/listing/:id/reviews",reviewRouter);
app.use("/",userRouter);

app.all("*",(req,res,next)=>{
      next(new ExpressError(404,"PAGE NOT FOUND"));
});

app.use((err,req,res,next)=>{
    let {status=500,message="Something wents wrong"} = err;
    res.status(status).render("error.ejs",{err:{message,status}});
//  res.status(status).send(msg);
});

app.listen(3000,() => {
    console.log("server listening to port 3000");
});
