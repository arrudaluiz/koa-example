'use strict';

const task = require('./controllers/task');

module.exports = function routes(app) {
  app.get('/tasks', task.list);
  app.get('/tasks/:id', task.read);
  app.post('/tasks', task.create);
  app.put('/tasks/:id', task.update);
  app.del('/tasks', task.clear);
  app.del('/tasks/:id', task.delete);
};