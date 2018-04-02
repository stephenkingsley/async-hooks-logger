const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const asyncHooks = require('./index');
const logger = require('./log');

let numReqs = 0;
function messageHandler(worker, message) {
  numReqs += 1;
}

asyncHooks.create(data => {
  logger(`async_hooks: ${JSON.stringify(data)}`);
});

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('message', messageHandler);

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    if (req.url === '/') {
      res.writeHead(200);
      res.end('hello world\n');
      process.send('ok');
      console.log(`---executionAsyncId ${asyncHooks.executionAsyncId()}---`);
      console.log(`---triggerAsyncId ${asyncHooks.triggerAsyncId()}---`);
    }
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}