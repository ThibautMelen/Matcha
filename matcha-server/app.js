const express = require('express');
const mysql = require('mysql');

//Create connection
// const db = mysql.createConnection({
//     host     : '127.0.0.1',
//     port     : '3306',
//     user     : 'root',
//     password : '123456',
//     database : 'matcha'
// })

//Connect
// db.connect((err) => {    
//     if(err){
//         throw err;
//         console.error(`app.js / db.connect fail`)
//     }
//     console.log('ha !');
//     console.log(`My sql connected`);
// })

const app = express();

//Create DB
// app.get('/createdb', (req, res) => {
//     let sql = 'CREATE DATABASE hoyeah';
//     db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Database created');
//     });
// });


app.listen('3000', () => {
    console.log(`Server start on port 3000`);
    console.log(`dvddvddfbbggbr`);
    
});