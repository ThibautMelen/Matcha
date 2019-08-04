const http = require('http');

const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const mysql = require('mysql');

const setupRouter = require('./routes/setup');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

module.exports = class Server {

    constructor(port) {
        this.app = express();
        this.port = port;
    }

    init() {
        console.log('starting server...');

        // Middlewares
        this.app.use(parser.urlencoded({ extended: true }));
        this.app.use(parser.json());
        this.app.use(cors());
        this.app.use((req, res, next) => {
            req.db = this.db;
            next();
        })

        this.db = mysql.createConnection({
            host     : 'localhost',
            port: 3306,
            user     : 'root',
            password : 'your_current_password',
            database : 'matchadb'
        });

        this.app.use('/setup', setupRouter());
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
