import { combineReducers } from 'redux';
import * as types from './actions';

const listsHandlers = {
  [types.ADD_LIST]: (state, { payload }) => [...state, payload],
  [types.DELETE_LIST]: (state, { payload }) =>
    state.filter(list => list.id !== payload),
  [types.RENAME_LIST]: (state, { payload }) => {
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
  [types.ADD_ITEM]: (state, { payload }) => [...state, payload],
  [types.DELETE_ITEM]: (state, { payload }) =>
    state.filter(item => item.id !== payload),
  [types.RENAME_ITEM]: (state, { payload }) => {
    const newState = [...state];
    newState.find(item => item.id === payload.id).task = payload.task;
    return newState;
  },
  [types.TOGGLE_DONE]: (state, { payload }) => {
    const newState = [...state];
    const item = newState.find(item => item.id === payload.id);
    item.complete = !item.complete;
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
