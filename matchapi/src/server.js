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

        this.server = http.createServer(this.app);
    }

    async handleConnect(sock, connect = true, user_token = null) {
        if (sock.handshake.headers) {
            try {
                let cookies = sock.handshake.headers.cookie ? sock.handshake.headers.cookie.split(';').map(v => ({name: v.split('=')[0], value: v.split('=')[1]})) : []
                console.log(cookies)
                let token = cookies.find(v => v.name === 'user_token')

                if (token) {
                    token = token.value
                }
                else {
                    token = user_token
                }

                //If User is connected
                if (token) {
                    console.log(sock.conn.id)
                    console.log('yoooo', token)
                    let decodedToken = await utils.verifyJWTToken(token)
                    let sql = "UPDATE users SET online = ?, sid = ? WHERE id = ?";
                    let inserts = [connect ? 1 : 0, connect ? sock.conn.id : null, decodedToken.data.id];
                    console.log('yyyyaaaa')

                    this.db.query(sql, inserts, (err, results) => {
                        if (err) {
                            console.log(`Failed to set user sid (id: ${decodedToken.data.id})`)
                        }
                        console.log(`${connect ? 'Online' : 'Disconnected'} id : ${decodedToken.data.id}`)
                        console.log('toto', inserts)
                    });
                }
            } catch(err){
                console.log(err)
            }
        }
    }

    start() {
        this.db.connect((err) => {
            if (err) throw err
            this.server.listen(this.port, () => {
                console.log(`server started on port ${this.port}`);
            })

            let socketIo = io(this.server)

            socketIo.on('connect', async (sock) => {
                console.log('SID : ', sock.conn.id)
                await this.handleConnect(sock, true)

                sock.on('set_sid', async (user_token) => {
                    await this.handleConnect(sock, true, user_token)
                })

                sock.on('disconnect', async () => {
                    await this.handleConnect(sock, false)
                })
            })

            this.app.use((req, res, next) => {
                req.io = socketIo;
                next();
            });

            this.app.use('/setup', setupRouter());
            this.app.use('/auth', authRouter());
            this.app.use('/user', userRouter());
        })
    }
}
