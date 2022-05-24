'use strict';

const luxon = require('luxon');

const Task = require('../models/task');

const status = {
  TODO: 'to do',
  DOING: 'doing',
  DONE: 'done',
};

exports.list = function* () {
  this.body = yield Task.list();
};

exports.read = function* () {
  const { id } = this.params;
  this.body = yield Task.read(id);
};

exports.create = function* () {
  const { text } = this.request.body;

  if (!text) {
    this.status = 400;
    this.body = { success: false, message: 'text required' };
    return;
  }

  const createdAt = luxon.DateTime.now().setLocale('pt-BR');
  const updatedAt = createdAt;
  const task = { text, status: status.TODO, createdAt, updatedAt };

  const id = yield Task.insert(task);
  this.body = { id: id };
  this.status = 200;
};

exports.update = function* () {
  const { id, text, status } = this.request.body;

  if (!(text || status)) {
    this.status = 400;
    this.body = { success: false, message: 'nothing to update' };
    return;
  }

  const updatedAt = luxon.DateTime.now().setLocale('pt-BR');
  const task = { text, status: status.TODO, updatedAt };

  yield Task.update(id, task);
  this.status = 200;
};

exports.clear = function* () {
  yield Task.clear();
  this.status = 200;
};

exports.delete = function* () {
  const { id } = this.params;
  yield Task.delete(id);
  this.status = 200;
};