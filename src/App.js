import { useState } from 'react';
import AllLists from './components/AllLists';
import TodoList from './components/TodoList';

const App = () => {
  const [listId, setListId] = useState(null);
  const onUserClick = id => setListId(id);
  const resetListId = () => setListId(null);

  return (
    <div>
      <AllLists onListNameClick={onUserClick} />
      {listId && <TodoList listId={listId} resetListId={resetListId} />}
    </div>
  );
};

export default App;
