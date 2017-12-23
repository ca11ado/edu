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
import Cubic2 from './components/cubic';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;

const Main = () => (
  <Content>Главная страница</Content>
);

const Cubic = ({ match }) => (
  <Content>
    <h3>Cubic id: {match.params.cubicId}</h3>
    <div>
      <Cubic2/>
    </div>
  </Content>
);

export default () => (
  <Router>
    <Wrapper>
      <Header>
        <Link to="/">Main</Link>
        <Link to="/cubics/1">First Cubic</Link>
      </Header>

      <Route exact path="/" render={() => (
        <Redirect to="/cubics"/>
      )}/>
      <Route exact path="/cubics" component={Main}/>
      <Route path="/cubics/:cubicId" component={Cubic}/>

      <Footer/>
    </Wrapper>
  </Router>
);
