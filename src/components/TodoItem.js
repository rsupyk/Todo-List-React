import React from 'react';
import { BsPen, BsTrash } from 'react-icons/bs';

const TodoItem = props => {
  const {
    todo: { id, task, complete },
    onItemClick,
    onDeleteItemClick,
    onRenameItemClick
  } = props;

  const handleClick = () => {
    onItemClick(id, complete);
  };

  const handleDelete = () => {
    onDeleteItemClick(id);
  };

  const handleRename = () => {
    onRenameItemClick(id);
  };

  const taskElement = complete ? <s>{task}</s> : task;

  return (
    <div className='task'>
      <span onClick={handleClick}>{taskElement}</span>
      <div>
        <button onClick={handleRename}>
          <BsPen />
        </button>
        <button onClick={handleDelete}>
          <BsTrash />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
