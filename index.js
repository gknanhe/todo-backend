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
// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://zippy-florentine-e4aede.netlify.app"
//   );
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

// app.use(
//   cors({
//     origin: "https://zippy-florentine-e4aede.netlify.app", // Replace with your frontend URL
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true, // Enable credentials (if your frontend makes requests with credentials)
//   })
// );

app.use(cors());
// Add Access Control Allow Origin headers
// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     // "https://zippy-florentine-e4aede.netlify.app",
//     "http://localhost:5174/"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5174"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from CharL.I!",
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error in connecting to server : " + err);
    return;
  }
  console.log("Server is started and running at port : " + PORT);
});
