const menu = (state = { id: 2 }, action) => {
  switch (action.type) {
    case 'SET_MENU':
      return Object.assign({}, state, {
        id: action.id
      });
    default:
      return state;
  }
};

export default menu;

