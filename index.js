const http = require("http");
const express = require("express");

const { connectMongoose } = require("./config/mongoose");
const PORT = 8000;

const app = express();
connectMongoose();
app.get("/", (req, res) => {
  res.send("Hello Charlie!");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error in connecting to server : " + err);
    return;
  }
  console.log("Server is started and running at port : " + PORT);
});
