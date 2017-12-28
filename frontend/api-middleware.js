const _ = require('lodash');
const _request = require('request');
const API_URL = 'http://127.0.0.1:35353';

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

module.exports = function (req, res, next) {
  const responsePath = req.path;
  const sPath = responsePath.split('/');
  const pathAction = sPath[1];
  const pathEntity = sPath[2];
  const pathId = Number(sPath[3]);

  console.log('path action:' + pathAction  + ', path entity: ' + pathEntity + ', path id: ' + pathId);
  if (!pathAction || !pathEntity) {
    return next();
  }

  const path = pathAction + '/' + pathEntity + (pathId ? '/' + pathId : ''); 
  request(path)
    .then(function (response) {
      console.log('>>> response');
      console.log(response);
      return res(response);
    })
    .catch(function (response) {
      console.log('>>> error');
      console.log(response);
      return next();
    });
};

