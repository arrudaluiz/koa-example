const Koa = require('koa');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const Router = require('koa-router');

const routes = require('./routes');
const server = require('./server');

const app = new Koa();
const router = new Router();
const PORT = 3000;

server();
routes(router);

app.use(logger());
app.use(koaBody());
app.use(router.routes());

app.listen(PORT, function() {
  console.info(`listening at http://localhost:${PORT}`);
});
