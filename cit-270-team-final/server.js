const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const http = require('http')

let invalidloginAttemps = 0;

const app = express();
app.use(bodyParser.json());
app.get('/', (req,res)=>{
   res.send("Hello browser");
});

app.post('/login',(req,res) => {
   console.log(JSON.stringify(req.body));
   if(invalidloginAttemps>=5) {
       res.status(401); 
   }
   else if (req.body.userName =="aquaisie" && (req.body.password) =="P@ssw0rd"){
       res.send("Welcome!")
   }
   else{
       invalidloginAttemps++;
       console.log(invalidloginAttemps+" invalid attemps");
       res.status(401); //unauthorized
       res.send("Who are you?")
   }
})

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


