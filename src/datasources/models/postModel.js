const SQL = require('sequelize');

const createPostModel = (db) =>
  db.define('post', {
    id: {
      type: SQL.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: SQL.STRING,
    imgs: SQL.ARRAY(SQL.STRING),
    likes: SQL.ARRAY(SQL.STRING),
    author: SQL.INTEGER,
    createdAt: SQL.TIME,
    updatedAt: SQL.TIME,
  });

module.exports = createPostModel;
