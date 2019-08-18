const http = require('http');

const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');

const setupRouter = require('./routers/setup/routes');
const authRouter = require('./routers/auth/routes');
const userRouter = require('./routers/user/routes');

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

        const allowedOrigins = [ 'http://localhost:8080' ]
        this.app.use(cors({
            origin: (origin, callback) => {
            // Allow requests with no origin
            if (!origin) {
                return callback(null, true)
            }
            if(allowedOrigins.indexOf(origin) === -1) {
              var msg = 'The CORS policy for this site does not allow access from the specified Origin.'
              return callback(new Error(msg), false)
            }
        
            return callback(null, true)
          },
          credentials: true
        }))

        this.app.use(cookieParser());
        this.app.use((req, res, next) => {
            req.db = this.db;
            next();
        });

        this.db = mysql.createConnection({
            host     : 'localhost',
            port     :  3306,
            user     : 'root',
            password : 'your_current_password',
            database : 'matchadb'
        });

        this.app.use('/setup', setupRouter());
        this.app.use('/auth', authRouter());
        this.app.use('/user', userRouter());

        this.server = http.createServer(this.app);
    }

    start() {
        this.db.connect((err) => {
            if (err) throw err
            this.server.listen(this.port, () => {
                console.log(`server started on port ${this.port}`);
            })
        })
    }
}
