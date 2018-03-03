import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  max-height: 50px;
  font-size: 20px;
`;

export default (props) => {

  return (
    <Header>{props.children}</Header>
  );
};
