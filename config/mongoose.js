// const env = require('./environment');
// const mongoose = require('mongoose');

// // mongoose.connect(`mongodb://127.0.0.1/${env.db}`);
// mongoose.connect(process.env.AUTHENTICATION_DB);

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'Error connecting to MongoDB !!'));

// db.once('open', ()=>{
//     console.log('Successfully connected to the db: MongoDB');
// })

// module.exports = db;
require("dotenv").config();

const mongoose = require("mongoose");

exports.connectMongoose = () => {
  mongoose
    .connect(`${process.env.AUTHENTICATION_DB}`)
    .then((e) => console.log(`Connected to mongoDB: ${e.connection.host}`))
    .catch((e) => console.log(e));
};
