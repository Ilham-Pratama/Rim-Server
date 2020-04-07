require('dotenv').config();
const jwt = require('jsonwebtoken');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const { ApolloServer } = require('apollo-server-express');
const AccountAPI = require('../datasources/account');
const createStore = require('../datasources/utils');

const secretKey = process.env.SECRETKEY;
const { account } = createStore();

module.exports = () =>
  new ApolloServer({
    context: ({ req }) => {
      const bearerToken = (req.headers && req.headers.authorization) || '';
      console.log(bearerToken || 'auth invalid');
      const splittedValue = bearerToken.split(' ');
      const token = splittedValue[1];
      try {
        const user = jwt.verify(token, secretKey);
        return { user };
      } catch {
        return { user: 'no user' };
      }
    },
    typeDefs,
    resolvers,
    engine: {
      apiKey: process.env.SECRETKEY,
    },
    dataSources: () => ({
      AccountAPI: new AccountAPI({ store: account }),
    }),
  });
