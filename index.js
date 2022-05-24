'use strict';

const http = require('http');
const Koa = require('koa');
const luxon = require('luxon');
const routes = require('./routes');

const app = new Koa();
const PORT = 3000;

// logger
app.use(async (ctx, next) => {
  const date = luxon.DateTime.now().setLocale('pt-BR');
  await next();
  console.log(`${date}: ${ctx.method} ${ctx.url}`);
});

routes(app);

http.createServer(app.callback()).listen(PORT);
console.info(`listening at http://localhost:${PORT}`);