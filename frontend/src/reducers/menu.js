const menu = (state = { id: 2 }, action) => {
  switch (action.type) {
    case 'SET_MENU':
      if (state.id === action.id) {
        return state;
      }
      return Object.assign({}, state, {
        id: action.id
      });
    default:
      return state;
  }
};

export default menu;

