import React from 'react';
import View from './view';
import store from '../../store';
import { connect } from 'react-redux'
import { getCubic } from '../../api';

const mapStateProps = state => {
  return {
    cubic: state.cubic
  }
};

class Cubic extends React.Component {
  componentDidMount () {
    const id = this.props.params.cubicId;
    getCubic(id)
      .then(({ id, name, content, children, parents }) => {
        store.dispatch({
          type: 'SET_CUBIC',
          id,
          name,
          content,
          children,
          parents
        });
      });
  }

  render () {
    return (
      <View cubic={this.props.cubic} />
    );
  }
}

export default connect(
  mapStateProps
)(Cubic);

