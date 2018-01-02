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
  <Content>
    <h1>Главная страница</h1>
    <div>
      Здесь когда-нибудь будет список всех доступных кубиков<br />
      Вот несколько в качестве примера: 
      <Link to="/cubic/1/"> раз</Link> и
      <Link to="/cubic/2/"> два</Link> и 
      <Link to="/cubic/3/"> три</Link>
    </div>
  </Content>
);

const CubicPage = ({ match }) => (
  <Content>
      <Cubic params={match.params} />
  </Content>
);

const TestComponent = () => {
  return (<h6>test component</h6>);
};

export default () => (
  <Router>
    <Wrapper>
      <Header>
        <Route path="/cubic" render={() => (
          <Link to="/">MainPage</Link>
        )} />
      </Header>

      <Route exact path="/" render={() => (
        <Redirect to="/cubics"/>
      )}/>
      <Route exact path="/cubics" component={MainPage}/>
      <Route path="/cubic/:cubicId" component={CubicPage}/>

      <Footer/>
    </Wrapper>
  </Router>
);
