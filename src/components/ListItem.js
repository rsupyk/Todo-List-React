import React from 'react';
import { BsPen, BsTrash } from 'react-icons/bs';

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
    <li className={props.className}>
      <span onClick={handleClick}>{name}</span>
      <BsPen onClick={handleRename} style={{ marginLeft: '1rem' }} />
      <BsTrash onClick={handleDelete} style={{ marginLeft: '.5rem' }} />
    </li>
  );
};

export default ListItem;
