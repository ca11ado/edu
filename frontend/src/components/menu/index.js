import React from 'react';
import store from '../../store';

function setFirstGraph () {
  store.dispatch({
    type: 'SET_MENU',
    id: 1
  });
}

function setSecondGraph () {
  store.dispatch({
    type: 'SET_MENU',
    id: 2
  });
}

function setListMenu () {
  store.dispatch({
    type: 'SET_MENU',
    id: 3
  });
}


export default () => {
  return (
    <div>
      <button onClick={setFirstGraph}>first</button>
      <button onClick={setSecondGraph}>second</button>
      <button onClick={setListMenu}>list</button>
    </div>
  );
};
