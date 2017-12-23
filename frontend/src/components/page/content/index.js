import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  height: 100%;
`;

export default (props) => {

  return (
    <Content>{props.children}</Content>
  );
};
