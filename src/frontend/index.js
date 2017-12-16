import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import app from './reducers';
import Router from './router';
import './index.css';

const store = createStore(app);

ReactDOM.render(
  <Provider store={store}>
    <Router/>
  </Provider>,
  document.getElementById('app')
);
