import React from 'react';
import _ from 'lodash';
import View from './view';
import store from '../../store';
import { connect } from 'react-redux'
import { getCubic, getCubics } from '../../api';
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

    return (
      <div>
        { cubics }
      </div>
    );
  }
}

export default connect(
  mapStateProps
)(Cubics);

