import React from 'react';

export default ({ cubic = {} }) => {
  return (
    <div>
      <h1>{cubic.name}</h1>
      <div>{cubic.content}</div>
    </div>
  );
};

