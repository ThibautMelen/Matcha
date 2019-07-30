const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    socketPath : '/tmp/mysql.sock',
    port: 3306,
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'tamere',
    insecureAuth: true
});

// const db = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '123456',
//     database : 'nodemysql'
// });

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();

app.listen('3000', () => {
    console.log('Server started on port 3000');
});