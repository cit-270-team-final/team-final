const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const port = 8080;
const http = require('http')
const mongodb = require('mongodb')


const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://cit270-final:Passw0rd123@cluster0.okmzh.mongodb.net/test";

const { v4: uuidv4 } = require('uuid');
uuidv4(); 

let invalidloginAttemps = 0;

app.use(express.static('public'));
app.use(bodyParser.json());
app.get('/', (req,res)=>{
   res.send("Hello browser");
});

app.post('/create',(req,res) => {
   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("cit270-login-database");
      dbo.collection("team-final").insertOne(req.body, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    });

    res.send("User created")
});

app.post('/login',(req,res) => {
   let user = {};
   let dbResult = [];
   
   console.log(JSON.stringify(req.body));

   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("cit270-login-database");
      var query = { userName: req.body.userName };
      dbo.collection("team-final").find(query).toArray(function(err, result) {
        dbResult = result;
        user = result[0]; //first user
        console.log ("user",user)
        console.log ("password", user.password)
        if (err) throw err;
        console.log(result);
        db.close();
      });
    });
    console.log ("line 57", user)

   if(invalidloginAttemps>=5) {
       res.status(401); 
   }
   else if (req.body.password == user.password){
      let myuuid = uuidv4();
      console.log('Your UUID is: ' + myuuid);
       res.send(myuuid)
   }
   else{
      console.log (req.body.password)
      console.log (user.password)
       invalidloginAttemps++;
       console.log(invalidloginAttemps+" invalid attemps");
       res.status(401); //unauthorized
       res.send("Who are you?")
   }
});

app.listen(port, () => {
   console.log(`DB Connected and server running on ${port}.`);
});



