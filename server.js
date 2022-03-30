const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const http = require('http')

const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

let invalidloginAttemps = 0;



const app = express()
const fs = require('fs')
const md5 = require('md5');
//const port = 443;

let Invalid_loginAttempts= 0;

app.use(express.static('public'));

// const app = express();
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

app.get('/', (req, res) => {
    res.send("Hello Browser");
});

//...
// try{
// https.createServer({
//   key: fs.readFileSync('server.key'),
//   cert: fs.readFileSync('server.cert')
// }, app).listen(port, () => {
//   console.log('Listening...')
// })} catch(error){
//     console.log(error)
// }



app.post('/login', (req, res) =>{
    console.log(JSON.stringify(req.body));
    console.log("Password given " + req.body.password)
    if(Invalid_loginAttempts>=5){
        res.status(403);// UNAUTHORIZED
        res.send("Max attempts reached.")
    }
    else if(req.body.userName == "test@test125.com" && md5(req.body.password)== "ee6bfd6c8556ddf7fd7511b4a3c14fe7"){
        res.send("Welcome!")
    }else{
        res.status(403);// UNAUTHORIZED
        res.send("Who are you?");
        Invalid_loginAttempts +=1
        console.log(Invalid_loginAttempts+ "invalid attempt made")
    }
});


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


