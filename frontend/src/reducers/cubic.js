const mvpCubic = {
  id: NaN,
  name: 'Not found'
};

const cubic = (state = mvpCubic, action) => {
  switch (action.type) {
    case 'SET_CUBIC':
      return Object.assign({}, state, {
        id: action.id,
        name: action.name,
        content: action.content
      });
    default:
      return state;
  }
};

export default cubic;

