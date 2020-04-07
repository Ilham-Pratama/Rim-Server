const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    me: Account
  }

  type Mutation {
    signUp(
      username: String!
      password: String!
      email: String!
    ): Signup_Response
    signIn(email: String!, password: String!): String
  }

  type Signup_Response {
    status: String
    res: String
  }

  type Account {
    id: String
    username: String
    password: String
    email: String
    imgurl: String
    createdAt: String
    updatedAt: String
  }
`;
