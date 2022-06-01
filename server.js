const db = require('./common/db');

module.exports = async () => {
  try {
    const conn = await db.sync();
    if (!conn) {
      throw 'database connection failed!';
    }
    console.info('Database connection established')
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
