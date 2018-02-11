import React from 'react';
import _ from 'lodash';
import { map, remove, isUndefined, flatten } from 'lodash/fp';
import GraphFirst from './graph-first';
import GraphSecond from './graph-second';
import store from '../../store';
import { connect } from 'react-redux'
import { getCubics } from '../../api';
import { Link } from 'react-router-dom';
import GraphsMenu from './graphs-menu';
import styled from 'styled-components';

const GraphWrapper = styled.div`
  margin-top: 50px;
`;

const mapStateProps = state => {
  return {
    cubics: state.cubics,
    graph: state.graph
  }
};

function getCurrentGraph (id, data) {
  switch (id) {
    case 1:
      return <GraphFirst data={data}/>;
    case 2:
      return <GraphSecond data={data}/>;
    default:
      return 'Nothing here';
  }
}

class Cubics extends React.Component {
  componentDidMount () {
    getCubics()
      .then((response) => {
        store.dispatch({
          type: 'SET_CUBICS',
          cubics: response
        });
      });
  }

  render () {
    const cubics = _.map(this.props.cubics, (cubic) => {
      const href = `/cubic/${cubic.id}`;
      return (
        <li key={"li_" + cubic.id}>
          <Link key={cubic.id} to={href}>{cubic.name}</Link>
        </li>
      );
    });

    const links = _.flow(
      map(({ name, children = [] }) => _.map(children, child => ({
        source: name,
        target: child.name
      }))),
      remove(isUndefined),
      flatten
    )(this.props.cubics);

    const normalizedCubics = {
      nodes: _.map(this.props.cubics, ({ id, name }) => ({ id: name })),
      links
    };

    return (
      <div>
        {cubics}
        <GraphWrapper>
          <GraphsMenu />
          {getCurrentGraph(this.props.graph.id, normalizedCubics)}
        </GraphWrapper>
      </div>
    );
  }
}

export default connect(
  mapStateProps
)(Cubics);

