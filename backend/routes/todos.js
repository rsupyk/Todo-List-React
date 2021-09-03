const express = require('express');
const router = express.Router();
const todoSchema = require('../models/todo');
const { Validator } = require('express-json-validator-middleware');
const { validate } = new Validator();

// Get all
router.get('/', (req, res) => {
  res.json(todos);
});

// Get many by listId
router.get('/listId/:id', (req, res) => {
  const todosByListId = todos.filter(todo => todo.listId === req.params.id);
  res.json(todosByListId);
});

// Create
router.post('/', validate({ body: todoSchema }), (req, res) => {
  todos.push(req.body);
  res.status(201).json(req.body);
});

// Update
router.patch('/:id', getTodo, (req, res) => {
  if (req.body.complete != null) {
    res.todo.complete = req.body.complete;
  }
  if (req.body.task != null) {
    res.todo.task = req.body.task;
  }
  res.json(res.todo);
});

// Delete
router.delete('/:id', getTodo, (req, res) => {
  const index = todos.findIndex(todo => todo.id === res.todo.id);
  todos.splice(index, 1);
  res.json({ message: 'Deleted todo' });
});

function getTodo(req, res, next) {
  const todo = todos.find(todo => todo.id === req.params.id);
  if (todo == null) {
    return res.status(404).json({ message: 'Cannot find todo' });
  }
  res.todo = todo;
  next();
}

function deleteManyByListId(id) {
  todos = todos.filter(todo => todo.listId !== id);
}

let todos = [
  {
    id: '1',
    listId: '101',
    task: 'Exercise',
    complete: false
  },
  {
    id: '2',
    listId: '101',
    task: 'Feed cat',
    complete: true
  },
  {
    id: '3',
    listId: '101',
    task: 'Rake leaves',
    complete: false
  },
  {
    id: '4',
    listId: '102',
    task: 'Close issue',
    complete: true
  },
  {
    id: '5',
    listId: '103',
    task: 'Go to Store',
    complete: false
  },
  {
    id: '6',
    listId: '103',
    task: 'Buy cheese',
    complete: false
  }
];

module.exports = {
  todosRouter: router,
  getAllTodos: () => todos,
  deleteTodosFromList: deleteManyByListId
};
