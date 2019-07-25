const express = require('express');
const mysql = require('mysql');

//Create connection
const db = mysql.createConnection({
    host :      'localhost',
    user :      'me',
    password :  'secret',
    database :  'my_db'
})

const app = express();





app.listen('3000', () => {
    console.log(`Server start on port 3000`);
})