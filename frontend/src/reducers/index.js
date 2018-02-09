import { combineReducers } from 'redux';
import cubic from './cubic';
import cubics from './cubics';
import graph from './graph';

const app = combineReducers({
  cubic,
  cubics,
  graph
});

export default app;
