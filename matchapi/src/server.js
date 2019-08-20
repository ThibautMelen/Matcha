const http = require('http');

const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const io = require('socket.io');

const setupRouter = require('./routers/setup/routes');
const authRouter = require('./routers/auth/routes');
const userRouter = require('./routers/user/routes');

const utils = require('./utils');

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
        this.app.use('/public', express.static('public'));

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


        this.db = mysql.createConnection({
            host     : 'localhost',
            port     :  3306,
            user     : 'root',
            password : 'your_current_password',
            database : 'matchadb'
        });
        this.app.use((req, res, next) => {
            req.db = this.db;
            next();
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

            let socket = io(this.server)
            

            socket.on('connect', async (sock) => {
                //Change To Online 1
                try {
                    let cookies = sock.handshake.headers.cookie.split(';').map(v => ({name: v.split('=')[0], value: v.split('=')[1]}))
                    let token = cookies.find(v => v.name === 'user_token')

                    if (token) {
                        let decodedToken = await utils.verifyJWTToken(token.value)
                        let sql = "UPDATE users SET online = ? WHERE id = ?";
                        let inserts = [1, decodedToken.data.id];

                        this.db.query(sql, inserts, (err, results) => {
                            if (err) {
                                console.log(`Failed to set user as connected (id: ${decodedToken.data.id})`)
                            }
                            console.log(`Online id : ${decodedToken.data.id}`)
                        });
                    }
                } catch(err){
                    console.log(err)
                }
                sock.on('disconnect', async () => {
                    //Change To Offline 0 //WITH SOCKET
                    var today  = new Date();
                    try {
                        let cookies = sock.handshake.headers.cookie.split(';').map(v => ({name: v.split('=')[0], value: v.split('=')[1]}))
                        let token = cookies.find(v => v.name === 'user_token')

                        if (token) {
                            let decodedToken = await utils.verifyJWTToken(token.value)
                            let sql = "UPDATE users SET online = ?, last_co = ? WHERE id = ?";
                            let inserts = [0, today.toLocaleDateString("en-GB"), decodedToken.data.id];

                            this.db.query(sql, inserts, (err, results) => {
                                if (err) {
                                    console.log(`Failed to set user as connected (id: ${decodedToken.data.id})`)
                                }
                                console.log(`Disconnected id : ${decodedToken.data.id} (with socket)`)
                            });
                            
                        }
                    }catch(err){
                        console.log(err)
                    }
                })
            })
        })
    }
}
