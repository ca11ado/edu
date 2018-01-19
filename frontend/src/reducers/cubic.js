const cubic = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CUBIC':
      return Object.assign({}, state, {
        id: action.id,
        name: action.name,
        content: action.content,
        parents: action.parents,
        children: action.children
      });
    default:
      return state;
  }
};

export default cubic;

