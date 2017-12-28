import ReactDOM from 'react-dom';
import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import app from './reducers';
import Router from './router';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router/>
  </Provider>,
  document.getElementById('app')
);
