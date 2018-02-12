import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import { map, remove, isUndefined, flatten } from 'lodash/fp';
import { connect } from 'react-redux'
import mockedData from './mock-data.js';
import List from './list';
import GraphFirst from './graph-first';
import GraphSecond from './graph-second';
import { getCubics } from '../../api';
import store from '../../store';

const mapStateProps = state => {
  return {
    cubics: state.cubics,
    menu: state.menu
  }
};

function getCurrentGraph (id, data, cubics) {
  switch (id) {
    case 1:
      return <GraphFirst data={data}/>;
    case 2:
      return <GraphSecond data={data}/>;
    case 3:
      return <List data={cubics}/>;
    default:
      return 'Nothing here';
  }
}

class Graph extends React.Component {
  componentDidMount () {
    getCubics()
      .then((response) => {
        store.dispatch({
          type: 'SET_CUBICS',
          cubics: response
        });
      })
      .catch(e => {
        console.log('>>> SET MOCKED DATA');
        store.dispatch({
          type: 'SET_CUBICS',
          cubics: mockedData
        });
      });
  }

  render () {
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
        {getCurrentGraph(this.props.menu.id, normalizedCubics, this.props.cubics)}
      </div>
    );
  }
};

export default connect(
  mapStateProps
)(Graph);
