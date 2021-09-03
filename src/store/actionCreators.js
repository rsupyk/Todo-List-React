import * as actionTypes from './actionTypes';

export const createList = newList => ({
  type: actionTypes.CREATE_LIST,
  payload: newList
});

export const deleteList = id => ({
  type: actionTypes.DELETE_LIST,
  payload: id
});

export const deleteTodosByListId = listId => ({
  type: actionTypes.DELETE_TODO_ALL,
  payload: listId
});

export const renameList = (id, newName) => ({
  type: actionTypes.RENAME_LIST,
  payload: { id: id, name: newName }
});

export const createTodo = newTodo => ({
  type: actionTypes.CREATE_TODO,
  payload: newTodo
});

export const deleteTodo = id => ({
  type: actionTypes.DELETE_TODO,
  payload: id
});

export const renameTodo = (id, newName) => ({
  type: actionTypes.RENAME_TODO,
  payload: { id: id, task: newName }
});

export const toggleDone = (id, complete) => ({
  type: actionTypes.TOGGLE_DONE,
  payload: { id: id, complete: complete }
});

export const storeAllLists = lists => ({
  type: actionTypes.STORE_LIST_ALL,
  payload: lists
});

export const storeAllTodos = todos => ({
  type: actionTypes.STORE_TODO_ALL,
  payload: todos
});
