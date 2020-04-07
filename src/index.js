const express = require('express');
const createApolloServer = require('./graphql');
const path = require('path');

const server = createApolloServer();
const app = express();
const port = 5000;

app.use('/assets/', express.static(path.join(__dirname, '../public')));

server.applyMiddleware({ app });
app.listen(port, () => console.log('Server started at localhost:' + port));
