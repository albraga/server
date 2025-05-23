import { createServer } from 'node:http';
import { createTable, insertData, getUsers, getUser } from './connect.js'

const PORT = process.env.PORT;

const server = createServer((req, res) => {
  const method = req.method;
  switch(method) {
    case 'GET' :
      read(req, res);
      break;
      case 'PUT' :
      break;
      case 'POST' :
      break;
      case 'DELETE' :
      break;
      default:
        send(res, { message: 'not found' }, 404)
  }
});

const read = (req, res) => {
    loggerMiddleware(req, res, () => {
    const url = req.url;
    const METHOD = req.method;
    const urlMETHOD = url + METHOD;
    const id = url.slice(11);
    if (urlMETHOD.match(/\/api\/usersGET/)) {
      const users = getUsers();
      users !== undefined && users !== null ? send(res, users, 200) : send(res, { message: 'users not found' }, 404);
    } else if (urlMETHOD.match(/\/api\/users:[0-9]+GET/)) {
      const user = getUser(id);
      user !== undefined && user !== null ? send(res, user, 200) : send(res, { message: `${id} not found`}, 404);
    }
    else {
      send(res, { message: 'not found' }, 404);
    }
  });
  };

const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
}

const send = (res, data, statusCode) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = statusCode;
  res.write(JSON.stringify(data));
  res.end();
};

server.listen(PORT, () => { });