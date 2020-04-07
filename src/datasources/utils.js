const SQL = require('sequelize');
const createAccountModel = require('./models/accountModel');
const createPostModel = require('./models/postModel');
require('dotenv').config();

const createStore = () => {
  const db = new SQL('project', 'postgres', process.env.PASSWORD, {
    host: '127.0.0.1',
    port: 9000,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  const account = createAccountModel(db);
  const post = createPostModel(db);
  return { account, post };
};

module.exports = createStore;
