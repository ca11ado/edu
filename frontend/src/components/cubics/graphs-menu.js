import React from 'react';
import store from '../../store';

function setFirstGraph () {
  store.dispatch({
    type: 'SET_GRAPH',
    id: 1
  });
}

function setSecondGraph () {
  store.dispatch({
    type: 'SET_GRAPH',
    id: 2
  });
}

export default () => {
  return (
    <div>
      <button onClick={setFirstGraph}>first</button>
      <button onClick={setSecondGraph}>second</button>
    </div>
  );
};
