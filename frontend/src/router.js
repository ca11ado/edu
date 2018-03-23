import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
import Header from './components/page/header';
import Footer from './components/page/footer';
import Content from './components/page/content';
import Cubic from './components/cubic';
import Cubics from './components/cubics';

const Wrapper = styled.div`
  text-align: center;
  height: 100%;
`;

const MainPage = ({ location }) => {
  const params = new URLSearchParams(location.search);
  return (
    <Content>
      <Cubics parents={params.get('parents')} />
    </Content>
  );
};

const CubicPage = ({ match }) => (
  <Content>
      <Cubic params={match.params} />
  </Content>
);

const NotFoundPage = () => {
  return (<h1>404 page</h1>);
};

export default () => (
  <Router>
    <Wrapper>
      <Header>
        <Route path="/cubic" render={() => (
          <Link to="/">MainPage</Link>
        )} />
      </Header>

      <Switch>
        <Route exact path="/" render={() => (
          <Redirect to="/cubics"/>
        )}/>
        <Route exact path="/cubics" component={MainPage}/>
        <Route path="/cubic/:cubicId" component={CubicPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Route path="/cubic" render={() => (
        <Footer />
      )} />
    </Wrapper>
  </Router>
);
