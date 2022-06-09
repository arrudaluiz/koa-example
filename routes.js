const task = require('./controllers/task');

module.exports = (router) => {
  router.get('/tasks', task.list);
  router.get('/tasks/:id', task.read);
  router.post('/tasks', task.create);
  router.put('/tasks/:id', task.update);
  router.del('/tasks', task.clear);
  router.del('/tasks/:id', task.delete);
};
