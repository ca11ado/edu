import React from 'react';
import Menu from '../menu';
import styled from 'styled-components';
import Graph from './graph';

const GraphWrapper = styled.div`
  margin-top: 10px;
  height: 100%;
`;

export default class Cubics extends React.Component {
  render () {
    return (
      <GraphWrapper>
        <Menu />
        <Graph parents={this.props.parents} />
      </GraphWrapper>
    );
  }
}

