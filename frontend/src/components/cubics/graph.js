import React from 'react';
import _ from 'lodash';
import { map, remove, isUndefined, flatten, filter } from 'lodash/fp';
import { connect } from 'react-redux'
import mockedData from './mock-data.js';
import List from './list';
import GraphFirst from './graph-first';
import GraphSecond from './graph-second';
import GraphThird from './graph-third';
import { getCubics } from '../../api';
import store from '../../store';
import { alternateCollection } from '../../utils/fp';

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
    case 4:
      return <GraphThird data={cubics}/>;
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
    const queryParents = Number(this.props.parents);
    const isCustomGruph = this.props.menu.id === 4;
    const cubicsForCustomGruph = alternateCollection(
      filter(cubic => _.some(cubic.parents, { id: queryParents })),
      filter(cubic => cubic.parents.length === 0),
      this.props.cubics
    );
    const cubics = isCustomGruph ? cubicsForCustomGruph : this.props.cubics;
    const links = _.flow(
      map(({ id, name, children = [] }) => _.map(children, child => ({
        source: id,
        target: child.id
      }))),
      remove(isUndefined),
      flatten
    )(cubics);

    const normalizedCubics = {
      nodes: _.map(cubics, ({ id, name }) => ({ id: id, name: name })),
      links
    };

    return getCurrentGraph(this.props.menu.id, normalizedCubics, cubics);
  }
}

export default connect(
  mapStateProps
)(Graph);
