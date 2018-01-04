const cubics = (state = [], action) => {
  switch (action.type) {
    case 'SET_CUBICS':
      return action.cubics;
    default:
      return state;
  }
};

export default cubics;

