const _request = require('request');
//const API_URL = 'http://92.53.77.254';
const API_URL = 'http://127.0.0.1';

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
  const path = `api/get/cubic/${id}`;
  return request(path);
};

