import axios from 'axios';
import * as actionCreators from './actionCreators';

export const listGetAll = () => async dispatch => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_LIST_URL);
    dispatch(actionCreators.storeAllLists(data.lists));
    dispatch(actionCreators.storeAllTodos(data.todos));
  } catch (error) {
    console.log(error);
  }
};

export const listCreate = list => async dispatch => {
  try {
    const { data } = await axios.post(process.env.REACT_APP_LIST_URL, list);
    dispatch(actionCreators.createList(data));
  } catch (error) {
    console.log(error);
  }
};

export const todoCreate = todo => async dispatch => {
  try {
    const { data } = await axios.post(process.env.REACT_APP_TODO_URL, todo);
    dispatch(actionCreators.createTodo(data));
  } catch (error) {
    console.log(error);
  }
};

export const listUpdate = (id, newName) => async dispatch => {
  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_LIST_URL}/${id}`,
      {
        name: newName
      }
    );
    dispatch(actionCreators.renameList(id, data.name));
  } catch (error) {
    console.log(error);
  }
};

export const todoUpdate = (id, newName) => async dispatch => {
  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_TODO_URL}/${id}`,
      {
        task: newName
      }
    );
    dispatch(actionCreators.renameTodo(id, data.task));
  } catch (error) {
    console.log(error);
  }
};

export const listDelete = id => async dispatch => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_LIST_URL}/${id}`
    );
    if (data) {
      dispatch(actionCreators.deleteTodosByListId(id));
      dispatch(actionCreators.deleteList(id));
    }
  } catch (error) {
    console.log(error);
  }
};

export const todoDelete = id => async dispatch => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_TODO_URL}/${id}`
    );
    if (data) {
      dispatch(actionCreators.deleteTodo(id));
    }
  } catch (error) {
    console.log(error);
  }
};

export const todoToggle = (id, complete) => async dispatch => {
  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_TODO_URL}/${id}`,
      {
        complete: complete
      }
    );
    dispatch(actionCreators.toggleDone(id, data.complete));
  } catch (error) {
    console.log(error);
  }
};
