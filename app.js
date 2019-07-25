const express = require('express');
const mysql = require('mysql');

//Create connection
const db = mysql.createConnection({
    host :      'localhost',
    user :      'me',
    password :  'secret',
    database :  'matcha'
})

//Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log(`My sql connected`);
})

const app = express();

app.listen('3000', () => {
    console.log(`Server start on port 3000`);
});