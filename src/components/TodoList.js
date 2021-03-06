import React, { useRef, useState } from 'react';
import uuid from 'react-uuid';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import {
  todoCreate,
  todoDelete,
  todoUpdate,
  todoToggle
} from '../store/actions';

const TodoList = props => {
  const { list, listId, todos } = props;
  const taskNameInput = useRef(null);
  const renameTodoInput = useRef(null);
  const [renameTodoId, setRenameTodoId] = useState(null);

  const handleAddTodo = ({ keyCode, target: { value } }) => {
    if (keyCode === 13 && value) {
      const newItem = {
        id: uuid(),
        listId: listId,
        task: value,
        complete: false
      };
      props.todoCreate(newItem);
      taskNameInput.current.value = '';
    }
  };

  const handleItemClick = (id, complete) => {
    props.todoToggle(id, !complete);
  };

  const handleDeleteClick = id => {
    props.todoDelete(id);
  };

  const handleRenameClick = id => {
    setRenameTodoId(id);
  };

  const handleRenameTodo = ({ keyCode, target: { value } }) => {
    if (keyCode === 13) {
      if (value) {
        props.todoUpdate(renameTodoId, value);
        renameTodoInput.current.value = '';
      }
      setRenameTodoId(null);
    }
  };

  const incompleteCount =
    'tasks left: ' + todos.filter(todo => !todo.complete).length;

  const renderedTodos = todos.map(todo => (
    <TodoItem
      key={todo.id}
      todo={todo}
      onItemClick={handleItemClick}
      onDeleteItemClick={handleDeleteClick}
      onRenameItemClick={handleRenameClick}
    />
  ));

  const editTodoInput = renameTodoId && (
    <input
      type='text'
      placeholder='edit todo'
      ref={renameTodoInput}
      onKeyUp={handleRenameTodo}
    />
  );

  return (
    <div className='todo-list'>
      <div className='todo-list-header'>
        <h2>{list.name}</h2>
        <div>
          <p className='todo-list-info'>{list.dateString}</p>
          <p className='todo-list-info'>{incompleteCount}</p>
        </div>
      </div>
      <div className='todo-list-body'>
        {renderedTodos}
        {editTodoInput}
        <input
          type='text'
          placeholder='new task name'
          ref={taskNameInput}
          onKeyUp={handleAddTodo}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { listId } = ownProps;
  const list = state.lists.find(list => list.id === listId);
  const todos = state.todos.filter(todo => todo.listId === listId);
  return { list, todos };
};

const actionCreators = { todoCreate, todoDelete, todoUpdate, todoToggle };

export default connect(mapStateToProps, actionCreators)(TodoList);
