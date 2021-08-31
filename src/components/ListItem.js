import React from 'react';

const ListItem = props => {
  const { id, name, onListNameClick, onDeleteListClick, onRenameListClick } =
    props;

  const handleClick = () => {
    onListNameClick(id);
  };

  const handleDelete = () => {
    onDeleteListClick(id);
  };

  const handleRename = () => {
    onListNameClick(id);
    onRenameListClick(id);
  };

  return (
    <li>
      <span onClick={handleClick}>{name}</span>
      <button onClick={handleRename}>Rename</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default ListItem;
