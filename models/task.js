'use strict';

const luxon = require('luxon');

const db = require('../common/db');

const status = {
  TODO: 'to do',
  DOING: 'doing',
  DONE: 'done',
};

exports.list = function* () {
  const items = [];
  const stream = db.createReadStream();
  stream.on('data', function (data) {
    const value = data.value;
    value.id = data.key;
    items.push(value);
  });
  return items;
};

exports.read = function* () {
  return yield db.get(id);
};

exports.insert = function* (task) {
  const id = luxon.DateTime.now();
  yield db.put(id, task);
  return id;
};

exports.update = function* (id, task) {
  const item = yield db.get(id);
  for (let key in task) {
    item[key] = task[key];
  }
  yield db.put(id, item);
  return item;
};

exports.delete = function* (id) {
  return yield db.del(id);
};

exports.clear = function* () {
  const tasks = yield exports.list();
  const ops = tasks.filter(function (task) {
    return task.status === status.DONE;
  }).map(function (task) {
    return {
      type: 'del',
      key: task.id
    }
  });

  return yield db.batch(ops);
};