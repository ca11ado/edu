import React from 'react';

export default ({ cubic = {} }) => {
  if (!cubic.name) {
    return (
      <div>Такого кубика не существует</div>
    );
  }

  return (
    <div>
      <h1>{cubic.name}</h1>
      <div>{cubic.content}</div>
    </div>
  );
};

