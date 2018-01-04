import { combineReducers } from 'redux';
import cubic from './cubic';
import cubics from './cubics';

const app = combineReducers({
  cubic,
  cubics
});

export default app;
