import { combineReducers } from 'redux';
import cubic from './cubic';
import cubics from './cubics';
import menu from './menu';

const app = combineReducers({
  cubic,
  cubics,
  menu
});

export default app;
