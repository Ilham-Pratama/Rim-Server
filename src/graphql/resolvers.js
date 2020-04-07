const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const secretKey = process.env.SECRETKEY;

const getToken = user => {
  if (user && user.dataValues)
    return jwt.sign(
      { ...user.dataValues, posts: [], followers: [] },
      secretKey
    );
  return null;
};

module.exports = {
  Query: {
    me: async (_, __, { dataSources: { AccountAPI } }) =>
      await AccountAPI.getCurrentUser()
  },
  Mutation: {
    signUp: async (_, { email, ...args }, { dataSources: { AccountAPI } }) => {
      // Find out if email is used
      const isEmailUsed = await AccountAPI.findUser({ email });
      // If it is
      if (isEmailUsed) {
        return {
          status: 403,
          res: isEmailUsed.email
        };
      }
      // Creating user
      const user = await AccountAPI.createUser({ ...args, email });
      // Tokenizing User data
      const res = getToken(user);
      // Returning token
      return {
        status: 200,
        res
      };
    },
    signIn: async (_, { email, password }, { dataSources: { AccountAPI } }) => {
      // Signing in
      const user = await AccountAPI.signIn({ email, password });
      // Returning token
      return getToken(user);
    }
  }
};
