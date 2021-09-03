const express = require('express');
const cors = require('cors');
const { ValidationError } = require('express-json-validator-middleware');
const listsRouter = require('./routes/lists');
const { todosRouter } = require('./routes/todos');

const app = express();
app.use(cors());
app.use(express.json());
app.use((error, request, response, next) => {
  if (error instanceof ValidationError) {
    response.status(400).send(error.validationErrors);
    next();
  } else {
    next(error);
  }
});

app.use('/lists', listsRouter);
app.use('/todos', todosRouter);

const port = 3001;
app.listen(port, () =>
  console.log(`Now listening at http://localhost:${port}`)
);
