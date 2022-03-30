const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const port = 8080;

const MONGODB_URI =
   process.env.MONGODB_URL ||
   `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.z8i5l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


mongoose
   .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      app.listen(port, () => {
         console.log(`DB Connected and server running on ${port}.`);
      });
   })
   .catch((err) => {
      console.log('Cannot connect to the database!', err);
      process.exit();
   });

   app.post('/login', (req,res) =>{
      console.log(JSON.stringify(req.body));
      if(invalidLoginAttempts>=5){
          res.status(401);//unauthorized
          res.send("Max attempts reached");
      } else if(req.body.userName =="samithueson" && md5(req.body.password)=="1d5f0d0ce00a31015dc120cda077f4d3"){
          res.send("Welcome!");
      } else{
          invalidLoginAttempts++;
          console.log(invalidLoginAttempts+" invalid attempts");
          res.status(401);//unauthorized
          res.send("Who are you?");
      }
  });
  