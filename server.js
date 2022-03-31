const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./user');
require('dotenv').config();

const app = express();

const {
   v4: uuidv4
} = require('uuid');
const md5 = require('md5');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'


let invalidloginAttemps = 0;

app.use(express.static('public'));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

const MONGODB_URI =
   process.env.MONGODB_URL ||
   `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.z8i5l.mongodb.net/CIT-270?retryWrites=true&w=majority`;

app.get('/', (req, res) => {
   res.send("Hello browser");
});

app.post('/createUser', (req, res) => {
   const userName = req.body.userName;
   const email = req.body.email;
   let password = req.body.password;
   const verifyPassword = req.body.verifyPassword;
   const accountType = req.body.accountType;
   const phone = req.body.phone;

   password = md5(password); //password saved to database as a hashed md5 string

   const user = new User({
      userName: userName,
      email: email,
      password: password,
      verifyPassword: verifyPassword,
      accountType: accountType,
      phone: phone
   })
   console.log(user);
   return user.save()
      .then((user) => {
         res.status(201).send(`Successfully created user!`)
      })
})

app.post('/login', (req, res) => {
   console.log(JSON.stringify(req.body));
   if (invalidloginAttemps >= 5) {
      res.status(401);
   } else if (req.body.userName == "shun@yahoo.com" && (req.body.password) == "P@ssw0rd") {
      let myuuid = uuidv4();
      console.log('Your UUID is: ' + myuuid);
      res.send(myuuid);
   } else {
      invalidloginAttemps++;
      console.log(invalidloginAttemps + " invalid attempts");
      res.status(401); //unauthorized
      res.send("Who are you?");
   }
})

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