const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const port = 443;

const MONGODB_URI =
   process.env.MONGODB_URL ||
   'mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.z8i5l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


mongoose
   .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      app.listen(port, () => {
         console.log('DB Connected ${port}.');
      });
   })
   .catch((err) => {
      console.log('Unable to connect with the database!', err);
      process.exit();
   });
