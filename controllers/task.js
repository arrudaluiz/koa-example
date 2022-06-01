const db = require('../common/db');
const Task = require('../models/task');

const taskStatus = {
  TODO: 'to do',
  DOING: 'doing',
  DONE: 'done',
};

exports.list = async (ctx) => {
  try {
    const tasks = await Task.findAll();
    if (!tasks) {
      throw { status: 404, message: "can't find tasks" };
    }

    ctx.response.status = 200;
    ctx.response.body = { success: true, count: tasks.length, tasks };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    ctx.response.status = error.status;
    ctx.response.body = { success: false, message: error.message };
  }
};

exports.read = async (ctx) => {
  const { id } = ctx.request.params;

  try {
    if (!id) {
      throw { status: 400, message: 'id required!' };
    }

    const task = await Task.findOne({ where: { id } });
    if (!task) {
      throw { status: 404, message: "can't find the requested task!" };
    }

    ctx.response.status = 200;
    ctx.response.body = { success: true, task };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    ctx.response.status = error.status;
    ctx.response.body = { success: false, message: error.message };
  }
};

exports.create = async (ctx) => {
  const { text } = ctx.request.body;

  try {
    if (!text) {
      throw { status: 400, message: 'text required!' };
    }

    const task = await Task.create({ text, status: taskStatus.TODO });
    if (!task) {
      throw { status: 400, message: 'task not created!' };
    }

    ctx.response.status = 200;
    ctx.response.body = { success: true, task };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    ctx.response.status = error.status;
    ctx.response.body = { success: false, message: error.message };
  }
};

exports.update = async (ctx) => {
  const { id } = ctx.request.params;
  const { text, status } = ctx.request.body;

  try {
    console.log(status);
    if (!id) {
      throw { status: 400, message: 'id required!' };
    }

    // no changes
    if (!(text || status)) {
      throw { status: 400, message: 'nothing to update!' };
    }

    // validate status if changed
    if (status) {
      const isValidStatus = Object.values(taskStatus).includes(status);

      if (!isValidStatus) {
        throw { status: 400, message: 'status not valid!' };
      }
    }

    // worth to call database
    const foundTask = await Task.findOne({ where: { id } });
    if (!foundTask) {
      throw { status: 404, message: "can't find the requested task" };
    }

    // update status
    if (status && status !== foundTask.status) {
      foundTask.status = status;
    }

    // update text
    if (text && text !== foundTask.text) {
      foundTask.text = text;
    }

    const task = await foundTask.save();

    ctx.response.status = 200;
    ctx.response.body = { success: true, task };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    ctx.response.status = error.status;
    ctx.response.body = { success: false, message: error.message };
  }
};

exports.clear = async (ctx) => {
  try {
    const deleted = await Task.destroy({ where: { status: 'done' } });

    ctx.response.status = 200;
    ctx.response.body = { success: true, deleted };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    ctx.response.status = error.status;
    ctx.response.body = { success: false, message: error.message };
  }
};

exports.delete = async (ctx) => {
  const { id } = ctx.request.params;

  try {
    if (!id) {
      throw { status: 400, message: 'id required!' };
    }

    const deleted = await Task.destroy({ where: { id } });
    if (!deleted) {
      throw { status: 404, message: "can't delete the requested task" };
    }

    ctx.response.status = 200;
    ctx.response.body = { success: true };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    ctx.response.status = error.status;
    ctx.response.body = { success: false, message: error.message };
  }
};
