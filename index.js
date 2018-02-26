const { Server } = require('http');
const url = require('url');
const qs = require('querystring');

const config = require('./config');

const server = new Server();

function sendData(res, data) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data, null, 2))
};

function parseUrl(reqUrl) {
  return url.parse(reqUrl, true);
};

function parseBody(req, cb) {
  let body = [];
  req
    .on('error', console.error)
    .on('data', chunk => body.push(chunk))
    .on('end', () => {
      body = Buffer.concat(body).toString();
      const data = qs.parse(body);
      cb(data);
    })
};

function onRequest(req, res) {
  const { url, method, headers } = req;
  
  const parsedUrl = parseUrl(url, true);
  
  parseBody(req, (parsedBody) => {
    res.on('error', console.error);
    sendData(res, {
      method,
      headers,
      parsedUrl,
      parsedBody
    });
  });
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

server
  .on('request', onRequest)
  .on('error', onError)
  .on('listening', onListening)
  .listen(config.PORT);