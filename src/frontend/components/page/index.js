import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;

const Header = styled.div`
  height: 50px;
  font-size: 20px;
`;
const Content = styled.div``;
const Footer = styled.div`  
  height: 50px;
`;

export default (props) => {
  const { title = 'Некая страница проекта' } = props;

  return (
    <Wrapper>
      <Header>{ title }</Header>
      <Content>{ props.children }</Content>
      <Footer>Powered by</Footer>
    </Wrapper>
  );
};
