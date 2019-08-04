const Server = require('./server');

const server = new Server(parseInt(process.env.PORT) || 3000);

server.init();
server.start();