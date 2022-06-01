const Sequelize = require("sequelize");
const db = require("../common/db");

const Task = db.define("task", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "to do",
    validate: {
      isIn: [["to do", "doing", "done"]],
    },
  },
});

module.exports = Task;
