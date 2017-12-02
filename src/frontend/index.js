import ReactDOM from 'react-dom';
import React from 'react';
import Page from './components/page';

const CubicContent = {
  name: 'Первый кубик',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis imperdiet ipsum eu venenatis euismod. Phasellus mattis libero leo, eget dictum velit aliquam a. Aliquam vestibulum blandit tellus at lobortis. Aliquam ullamcorper dolor sollicitudin sapien ultricies tempus. Vivamus imperdiet tellus ultricies, egestas nibh et, porta massa. Sed ullamcorper tempor consectetur.'
};

ReactDOM.render(
  <Page title="Cubic page">
    <h2>{ CubicContent.name }</h2>
    <div>{ CubicContent.content }</div>
  </Page>,
  document.getElementById('app')
);
