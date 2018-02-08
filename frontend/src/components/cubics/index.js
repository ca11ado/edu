import React from 'react';
import _ from 'lodash';
import { map, remove, isUndefined, flatten } from 'lodash/fp';
import Graph from './graph';
import store from '../../store';
import { connect } from 'react-redux'
import { getCubics } from '../../api';
import { Link } from 'react-router-dom';

const mapStateProps = state => {
  return {
    cubics: state.cubics
  }
};

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

    /*
    const links = _.flow(
      map(({ name, children = [] }) => {
        return children.length
          ? { source: name, target: children[0].name }
          : undefined;
      }),
      remove(isUndefined)
    )(this.props.cubics);
    */
    const links = _.flow(
      map(({ name, children = [] }) => _.map(children, child => ({ source: name, target: child.name }))),
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
        <Graph data={normalizedCubics}/>
      </div>
    );
  }
}

export default connect(
  mapStateProps
)(Cubics);

