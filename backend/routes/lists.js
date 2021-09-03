const express = require('express');
const router = express.Router();
const listSchema = require('../models/list');
const { Validator } = require('express-json-validator-middleware');
const { validate } = new Validator();
const { getAllTodos, deleteTodosFromList } = require('./todos');

// Get all
router.get('/', (req, res) => {
  const data = {
    lists: lists,
    todos: getAllTodos()
  };
  res.json(data);
});

// Create
router.post('/', validate({ body: listSchema }), (req, res) => {
  lists.push(req.body);
  res.status(201).json(req.body);
});

// Update
router.patch('/:id', getList, (req, res) => {
  if (req.body.name != null) {
    res.list.name = req.body.name;
    res.json(res.list);
  }
});

// Delete
router.delete('/:id', getList, (req, res) => {
  deleteTodosFromList(res.list.id);
  const index = lists.findIndex(list => list.id === res.list.id);
  lists.splice(index, 1);
  res.json({ message: 'Deleted list' });
});

function getList(req, res, next) {
  const list = lists.find(list => list.id === req.params.id);
  if (list == null) {
    return res.status(404).json({ message: 'Cannot find list' });
  }
  res.list = list;
  next();
}

const lists = [
  {
    id: '101',
    name: 'Personal List',
    dateString: '8/29/2021'
  },
  {
    id: '102',
    name: 'Work List',
    dateString: '8/30/2021'
  },
  {
    id: '103',
    name: 'Buy',
    dateString: '8/31/2021'
  }
];

module.exports = router;
