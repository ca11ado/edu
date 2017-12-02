import ReactDOM from 'react-dom';
import React from 'react';
import Router from './router';

const CubicContent = {
  name: 'Первый кубик',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis imperdiet ipsum eu venenatis euismod. Phasellus mattis libero leo, eget dictum velit aliquam a. Aliquam vestibulum blandit tellus at lobortis. Aliquam ullamcorper dolor sollicitudin sapien ultricies tempus. Vivamus imperdiet tellus ultricies, egestas nibh et, porta massa. Sed ullamcorper tempor consectetur.'
};

ReactDOM.render(
  <Router/>,
  document.getElementById('app')
);
