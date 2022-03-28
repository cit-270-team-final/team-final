const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const bodyParser = require('body-parser');
const https = require('https')
const app = express()
const fs = require('fs')
const md5 = require('md5');
const port = 443;

let Invalid_loginAttempts= 0;

app.use(express.static('public'));

// const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hello Browser");
});

//...
try{
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(port, () => {
  console.log('Listening...')
})} catch(error){
    console.log(error)
}



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