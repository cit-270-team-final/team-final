const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express()
const http = require('http')
require('dotenv').config();

const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'


let invalidloginAttemps = 0;

app.use(express.static('public'));
app.use(bodyParser.json());
app.get('/', (req,res)=>{
   res.send("Hello browser");
});

app.post('/createUser', (req, res) => {
   const userName = req.body.userName;
   const email = req.body.email;
   const password = req.body.password;
   const verifyPassword = req.body.verifyPassword;
   const accountType = req.body.accountType;
   const phone = req.body.phone;
})

app.post('/login',(req,res) => {
   console.log(JSON.stringify(req.body));
   if(invalidloginAttemps>=5) {
       res.status(401); 
   }
   else if (req.body.userName =="shun@yahoo.com" && (req.body.password) =="P@ssw0rd"){
      let myuuid = uuidv4();
      console.log('Your UUID is: ' + myuuid);
       res.send(myuuid) 
   }
   else{
       invalidloginAttemps++;
       console.log(invalidloginAttemps+" invalid attempts");
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
