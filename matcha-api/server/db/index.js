const mysql = require('mysql');

// Initialize pool
const pool = mysql.createPool({
    connectionLimit : 10,
    host     : '127.0.0.1',
    port     : '3306',
    user     : 'root',
    password : '123456',
    database : 'matchadb',
    debug    :  true
});    

let matchadb = {};

matchadb.all = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM db`, (err, results) => {
            if (err)
                return reject(err);
            return resolve(results);
        });
    });
};

module.exports = matchadb;



//Create connection
// const db = mysql.createConnection({
//     port:'3000',
//     host :      'localhost',
//     user :      'root',
//     password :  '123456',
//     // database :  'matcha'
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

//Create DB
// app.get('/createdb', (req, res) => {
//     let sql = 'CREATE DATABASE hoyeah';
//     db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Database created');
//     });
// });
