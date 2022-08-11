import * as express from 'express';

const app = express();
const Todo = {
  id: 1,
  title: 'todo',
  description: 'asd',
};
app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to todo!' });
});

app.post('/', (request, response) => {
  console.log(request.body);
  const newTodo = JSON.parse(request.body);
  Todo.add(newTodo);
  response.status(201).json();
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
