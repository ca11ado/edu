const _request = require('request');
const API_URL = 'http://92.53.77.254:35353'; // todo add to env variables

function request (path) {
  return new Promise((res, rej) => {
    _request(`${API_URL}/${path}`, (err, response, body) => {
      if (body) {
        let parsedBody;
        try {
          parsedBody = JSON.parse(body);
        } catch (e) {
          console.log('%c some text %o', 'color:red', 'Parsing Error >>>', e);
        }

        res(parsedBody);
      } else {
        rej(err);
      }
    });
  });
}

export const getCubic = (id) => {
  if (!id) {
    throw Error(`You should define id: ${id}`);
  }
  const path = `get/cubic/${id}`;
  return request(path);
};

export const getCubics = () => {
  const path = 'get/cubics';
  return request(path);
};

