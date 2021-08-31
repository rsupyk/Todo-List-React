import React from 'react';

const TodoItem = props => {
  const {
    todo: { id, task, complete },
    onItemClick,
    onDeleteItemClick,
    onRenameItemClick
  } = props;

  const handleClick = () => {
    onItemClick(id);
  };

  const handleDelete = () => {
    onDeleteItemClick(id);
  };

  const handleRename = () => {
    onRenameItemClick(id);
  };

  const taskElement = complete ? <s>{task}</s> : task;

  return (
    <div>
      <span onClick={handleClick}>{taskElement}</span>
      <button onClick={handleRename}>Rename</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;
