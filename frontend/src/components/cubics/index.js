import React from 'react';
import Menu from '../menu';
import styled from 'styled-components';
import Graph from './graph';

const GraphWrapper = styled.div`
  margin-top: 50px;
`;

export default class Cubics extends React.Component {
  render () {

    return (
      <div>
        <GraphWrapper>
          <Menu />
          <Graph />
        </GraphWrapper>
      </div>
    );
  }
}

