const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-jwt-strategy");
const MongoStore = require("connect-mongo");

const { connectMongoose } = require("./config/mongoose");
const PORT = 8000;

require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "https://zippy-florentine-e4aede.netlify.app", // Replace with your frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable credentials (if your frontend makes requests with credentials)
  })
);
connectMongoose();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   session({
//     name: "todoAuth",
//     secret: `${process.env.session_cookie_key}`,
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//       maxAge: 1000 * 60 * 100,
//     },
//     store: MongoStore.create(
//       {
//         // mongoUrl: "mongodb://localhost:27017/" + env.db,
//         mongoUrl: process.env.AUTHENTICATION_DB,
//         autoRemove: "disabled",
//       },
//       function (err) {
//         console.log(err || "connect-mongo setup successful!!");
//       }
//     ),
//   })
// );

app.use(passport.initialize());

// app.use(passport.session());

// app.use(passport.setAuthenticatedUser);

app.use("/api", require("./routes/index"));

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error in connecting to server : " + err);
    return;
  }
  console.log("Server is started and running at port : " + PORT);
});
