const graph = (state = { id: 2 }, action) => {
  switch (action.type) {
    case 'SET_GRAPH':
      return Object.assign({}, state, {
        id: action.id
      });
    default:
      return state;
  }
};

export default graph;

