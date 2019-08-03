const http = require('http');

const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const mysql = require('mysql');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

module.exports = class Server {

    constructor(port) {
        this.app = express()
        this.port = port
    }

    init() {
        console.log('starting server...')

        // Middlewares
        this.app.use(parser.urlencoded({ extended: true }))
        this.app.use(parser.json())
        this.app.use(cors())
        this.app.use((req, res, next) => {
            req.db = this.db
            next()
        })

        this.db = mysql.createConnection({
            host     : 'localhost',
            port: 3306,
            user     : 'root',
            password : 'your_current_password',
            database : 'matchadb'
        });

        this.app.use('/auth', authRouter());
        this.app.use('/user', userRouter());


        this.server = http.createServer(this.app)
    }

    start() {
        this.db.connect((err) => {
            if (err) throw err
            this.server.listen(this.port, () => {
                console.log(`server started on port ${this.port}`)
            })
        })
    }
}

// // Create connection
// const db = mysql.createConnection({
//     host     : 'localhost',
//     port: 3306,
//     user     : 'root',
//     password : 'your_current_password',
//     database : 'matchadb'
// });

// // Connect
// db.connect((err) => {
//     if(err){
//         throw err;
//     }
//     console.log('MySql Connected as id ' + db.threadId);
// });

// const app = express();
  
// Create DB if is not created
// app.get('/createdb', (req, res) => {
//     let sql = 'CREATE DATABASE matchadb';
//     req.db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Database created...');
//     });
// });


// //////////////////////////////////////////////////
// /////////////// SET UP DATABASE //////////////////
// //////////////////////////////////////////////////

// // Create table : users
// app.get('/createtable_users', (req, res) => {
    
//     let sql =   "CREATE TABLE `users` ( " + 
//                 "`id` int PRIMARY KEY NOT NULL AUTO_INCREMENT," +
//                 "`pseudo` varchar(255) NOT NULL," + 
//                 "`email` varchar(255) NOT NULL," +
//                 "`pass` varchar(255) NOT NULL," +
//                 "`avatar` varchar(255) NOT NULL," +
//                 "`notif` int(11) NOT NULL," +
//                 "`mail_key` varchar(32) NOT NULL," + 
//                 "`confirm` int(11) NOT NULL" +
//                 ") ENGINE=InnoDB DEFAULT CHARSET=utf8";

//     db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('User table created...');
//     });
// });

// // Add user 1
// app.get('/adduser1', (req, res) => {
//     let post = {pseudo:'Jean', email:'jean@matcha.com', pass:'123456', avatar:'oklm', notif: 1, mail_key:'oklm', confirm: 1};
//     let sql = "INSERT INTO users SET ?";
//     let query = db.query(sql, post, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('User 1 added...');
//     });
// });

// // Select users
// app.get('/getusers', async (req, res) => {
//     let sql = 'SELECT * FROM users';

//     db.query(sql)

//     let query = db.query(sql, (err, results) => {
//         if(err) {
//             return res.status(500).send("LOLNDR")
//         }
//     });
// });

// // Select single user
// app.get('/getuser/:id', (req, res) => {
//     let sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
//     let query = db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('User fetched...');
//     });
// });

// // Update user
// app.get('/updateuser/:id/:newName', (req, res) => {
//     let newName = req.params.newName;
//     let sql = `UPDATE users SET pseudo = '${newName}' WHERE id = ${req.params.id}`;
//     let query = db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('User updated...');
//     });
// });

// // Delete user
// app.get('/deluser/:id', (req, res) => {
//     let sql = `DELETE FROM users WHERE id = ${req.params.id}`;
//     let query = db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('User deleted...');
//     });
// });

// app.listen('3000', () => {
//     console.log('Server started on port 3000');
// });