import { createServer } from 'node:http';
import users from './db.js';

const PORT = process.env.PORT;

const server = createServer((req, res) => {
  const url = req.url;
  const METHOD = req.method;
  const urlMETHOD = url + METHOD;
  const id = parseInt(url.slice(5));

  if (urlMETHOD.match(/\/api\/usersGET/)) {
    send(res, users, 200);
  } else if (urlMETHOD.match(/\/api\/[0-9]+GET/) && users.find(user => user.id === id)) {
    send(res, users.filter(user => user.id === id), 200);
  }

  else {
    send(res, { message: 'not found' }, 404);
  }

});

const send = (res, data, statusCode) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = statusCode;
  res.write(JSON.stringify(data));
  res.end();
};

server.listen(PORT, () => { });