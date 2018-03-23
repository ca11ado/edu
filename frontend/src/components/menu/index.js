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
function setThirdGraph () {
  store.dispatch({
    type: 'SET_MENU',
    id: 4
  });
}


export default () => {
  return (
    <div>
      <button onClick={setFirstGraph}>first</button>
      <button onClick={setSecondGraph}>second</button>
      <button onClick={setListMenu}>list</button>
      <button onClick={setThirdGraph}>third</button>
    </div>
  );
};
