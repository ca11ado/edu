import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import Header from './components/page/header';
import Footer from './components/page/footer';
import Content from './components/page/content';
import Cubic from './components/cubic';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;

const MainPage = () => (
  <Content>Главная страница</Content>
);

const CubicPage = ({ match }) => (
  <Content>
      <Cubic params={match.params} />
  </Content>
);

export default () => (
  <Router>
    <Wrapper>
      <Header>
        <Link to="/">MainPage</Link>
        <Link to="/cubics/1">First Cubic</Link>
      </Header>

      <Route exact path="/" render={() => (
        <Redirect to="/cubics"/>
      )}/>
      <Route exact path="/cubics" component={MainPage}/>
      <Route path="/cubics/:cubicId" component={CubicPage}/>

      <Footer/>
    </Wrapper>
  </Router>
);
