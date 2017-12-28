import React from 'react';

export default ({ cubic = {} }) => {
  return (
    <div>
      <h2>{cubic.name} -- {cubic.id}</h2>
      <div>{cubic.content}</div>
    </div>
  );
};

