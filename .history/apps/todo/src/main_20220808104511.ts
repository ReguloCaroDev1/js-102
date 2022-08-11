import * as express from 'express';
import dotenv = require('dotenv');
dotenv.config();
const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to todo!' });
});

app.post('/', (request, response) => {
  console.log(request.body);
  response.status(201).json();
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
