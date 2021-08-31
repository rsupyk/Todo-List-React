import React, { useRef } from 'react';
import uuid from 'react-uuid';
import { connect } from 'react-redux';
import * as types from '../store/actions';

const TodoList = props => {
  const taskNameInput = useRef(null);

  const handleKeyUp = event => {
    if (event.keyCode === 13 && event.target.value) {
      const newItem = {
        id: uuid(),
        listId: props.listId,
        task: event.target.value,
        complete: false
      };
      props.addTodo(newItem);
      taskNameInput.current.value = '';
    }
  };

  const renderedTodos = props.todos.map(todo => (
    <div key={todo.id}>{todo.task}</div>
  ));

  return (
    <div>
      {renderedTodos}
      <input
        type='text'
        placeholder='new task name'
        ref={taskNameInput}
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { listId } = ownProps;
  const todos = state.todos.filter(todo => todo.listId === listId);
  return { todos };
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: newTodo => dispatch({ type: types.ADD_ITEM, payload: newTodo }),
    deleteTodo: id => dispatch({ type: types.DELETE_ITEM, payload: id }),
    renameTodo: (id, newName) =>
      dispatch({ type: types.RENAME_ITEM, payload: { id: id, task: newName } }),
    toggleDone: id => dispatch({ type: types.TOGGLE_DONE, payload: id })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
