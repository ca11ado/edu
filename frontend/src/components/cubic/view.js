import React from 'react';
import styled from 'styled-components';
import { map } from 'lodash';

const RelatedCubics = styled.div`
  display: flex;
  justify-content: space-around;
`;

export default ({ cubic = {} }) => {
  if (!cubic.name) {
    return (
      <div>Такого кубика не существует</div>
    );
  }

  const parentsList = map(cubic.parents, ({ name }, index) => <li key={'parent_' + index}>{name}</li>);
  const childrenList = map(cubic.children, ({ name }, index) => <li key={'children_' + index}>{name}</li>);

  return (
    <div>
      <h1>{cubic.name}</h1>
      <div>{cubic.content}</div>
      <RelatedCubics>
        <div>
          <ul>Родители
            {parentsList}
          </ul>
        </div>
        <div>
          <ul>Дети
            {childrenList}
          </ul>
        </div>
      </RelatedCubics>
    </div>
  );
};

