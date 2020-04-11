const SQL = require('sequelize');

const createAccountModel = (db) =>
  db.define('person', {
    id: {
      type: SQL.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: SQL.STRING,
    password: SQL.STRING,
    email: SQL.STRING,
    followers: SQL.ARRAY(SQL.STRING),
    following: SQL.ARRAY(SQL.STRING),
    imgurl: SQL.STRING,
    posts: SQL.ARRAY(SQL.STRING),
    unseenposts: SQL.ARRAY(SQL.STRING),
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
  });

module.exports = createAccountModel;
