import { createServer } from 'node:http';
import {getUsers, getUser, createUser} from './connect.js'

const PORT = process.env.PORT;

const server = createServer((req, res) => {
  const method = req.method;
  switch (method) {
    case 'GET':
      readHandler(req, res);
      break;
    case 'POST':
      createHandler(req, res);
      break;
    case 'PUTT':
      break;
    case 'DELETE':
      break;
    default:
      send(res, { message: 'not found' }, 404)
  }
});

const createHandler = (req, res) => {
  loggerMiddleware(req, res, () => {
    urlMethodMiddleware(req, res, (urlMETHOD, URLuser) => {
      if (urlMETHOD.match(/\/api\/usersPOST/)) {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
          req.on('end', () => {
          const newUser = JSON.parse(body);
          createUser(newUser);
          res.statusCode = 201;
          res.write(JSON.stringify(newUser));
          res.end();
        }); 
      }
      else {
        send(res, { message: 'not found' }, 404);
      }
    });
  });
};



const readHandler = (req, res) => {
  loggerMiddleware(req, res, () => {
    urlMethodMiddleware(req, res, (urlMETHOD, URLuser) => {
      if (urlMETHOD.match(/\/api\/usersGET/)) {
        const users = getUsers();
        users !== undefined && users !== null ? send(res, users, 200) : send(res, { message: 'users not found' }, 404);
      } else if (urlMETHOD.match(/\/api\/users:[0-9]+GET/)) {
        const user = getUser(URLuser.id);
        user !== undefined && user !== null ? send(res, user, 200) : send(res, { message: `${id} not found` }, 404);
      }
      else {
        send(res, { message: 'not found' }, 404);
      }
    });
  });
};

//http://localhost:8787/api/users:11:onze
const urlMethodMiddleware = (req, res, next) => {
  const url = req.url;
  const METHOD = req.method;
  const urlMETHOD = url + METHOD;
  const idTitle = url.slice(11).split(':');
  const id = idTitle[0];
  const title = idTitle[1];
  const URLuser = {id, title}
  next(urlMETHOD, URLuser);
}

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