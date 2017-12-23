const mvpCubic = {
  id: 1,
  name: 'Первый кубик',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis imperdiet ipsum eu venenatis euismod. Phasellus mattis libero leo, eget dictum velit aliquam a. Aliquam vestibulum blandit tellus at lobortis. Aliquam ullamcorper dolor sollicitudin sapien ultricies tempus. Vivamus imperdiet tellus ultricies, egestas nibh et, porta massa. Sed ullamcorper tempor consectetur.'
};

const cubic = (state = mvpCubic, action) => {
  switch (action.type) {
    case 'SET_CUBIC':
      return {
        id: action.id,
        name: action.name,
        content: action.content
      };
    default:
      return state;
  }
};

export default cubic;
