import React from 'react';
import { connect } from 'react-redux'
import View from './view';

const mapStateProps = state => {
  return {
    cubic: state.cubic
  }
};

export default connect(
  mapStateProps
)(View);
