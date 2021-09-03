import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';

const listsHandlers = {
  [actionTypes.STORE_LIST_ALL]: (state, { payload }) => [...state, ...payload],
  [actionTypes.CREATE_LIST]: (state, { payload }) => [...state, payload],
  [actionTypes.DELETE_LIST]: (state, { payload }) =>
    state.filter(list => list.id !== payload),
  [actionTypes.RENAME_LIST]: (state, { payload }) => {
    const newState = [...state];
    newState.find(list => list.id === payload.id).name = payload.name;
    return newState;
  },
  DEFAULT: state => state
};

export const listsReducer = (state = [], action) => {
  const handle = listsHandlers[action.type] || listsHandlers.DEFAULT;
  return handle(state, action);
};

const todosHandlers = {
  [actionTypes.STORE_TODO_ALL]: (state, { payload }) => [...state, ...payload],
  [actionTypes.CREATE_TODO]: (state, { payload }) => [...state, payload],
  [actionTypes.DELETE_TODO]: (state, { payload }) =>
    state.filter(item => item.id !== payload),
  [actionTypes.DELETE_TODO_ALL]: (state, { payload }) =>
    state.filter(item => item.listId !== payload),
  [actionTypes.RENAME_TODO]: (state, { payload }) => {
    const newState = [...state];
    newState.find(item => item.id === payload.id).task = payload.task;
    return newState;
  },
  [actionTypes.TOGGLE_DONE]: (state, { payload }) => {
    const newState = [...state];
    const item = newState.find(item => item.id === payload.id);
    item.complete = payload.complete;
    return newState;
  },
  DEFAULT: state => state
};

const todosReducer = (state = [], action) => {
  const handle = todosHandlers[action.type] || todosHandlers.DEFAULT;
  return handle(state, action);
};

export default combineReducers({
  lists: listsReducer,
  todos: todosReducer
});
