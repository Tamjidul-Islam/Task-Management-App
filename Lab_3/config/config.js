
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'tamjid',
    password: process.env.DB_PASS || '12345678',
    database: process.env.DB_NAME || 'taskdb',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false
  }
};
