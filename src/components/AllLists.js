import React, { useEffect, useRef, useState } from 'react';
import uuid from 'react-uuid';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import {
  listGetAll,
  listCreate,
  listDelete,
  listUpdate
} from '../store/actions';

const AllLists = props => {
  const { listGetAll } = props;
  const listNameInput = useRef(null);
  const renameListInput = useRef(null);
  const [renameListId, setRenameListId] = useState(null);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => listGetAll(), [listGetAll]);

  const handleAddList = ({ keyCode, target: { value } }) => {
    if (keyCode === 13 && value) {
      const newList = {
        id: uuid(),
        name: value,
        dateString: new Date().toLocaleDateString()
      };
      props.listCreate(newList);
      listNameInput.current.value = '';
    }
  };

  const handleDeleteClick = id => {
    props.listDelete(id);
    props.onListNameClick(null);
  };

  const handleRenameClick = id => {
    setRenameListId(id);
  };

  const handleRenameList = ({ keyCode, target: { value } }) => {
    if (keyCode === 13) {
      if (value) {
        props.listUpdate(renameListId, value);
        renameListInput.current.value = '';
      }
      setRenameListId(null);
    }
  };

  const handleListNameClick = id => {
    setActiveId(id);
    props.onListNameClick(id);
  };

  const renderedLists = props.allLists.map(list => (
    <ListItem
      key={list.id}
      id={list.id}
      name={list.name}
      onListNameClick={handleListNameClick}
      onDeleteListClick={handleDeleteClick}
      onRenameListClick={handleRenameClick}
      className={activeId === list.id ? 'active-list' : ''}
    />
  ));

  const editNameInput = renameListId && (
    <input
      type='text'
      placeholder='edit name'
      ref={renameListInput}
      onKeyUp={handleRenameList}
    />
  );

  return (
    <div className='left-box'>
      <h2>All lists</h2>
      <ul className='all-lists'>{renderedLists}</ul>
      {editNameInput}
      <input
        type='text'
        placeholder='new list name'
        ref={listNameInput}
        onKeyUp={handleAddList}
      />
    </div>
  );
};

const mapStateToProps = state => ({ allLists: state.lists });

const actionCreators = { listGetAll, listCreate, listDelete, listUpdate };

export default connect(mapStateToProps, actionCreators)(AllLists);
