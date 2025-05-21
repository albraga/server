import { createServer } from 'node:http';

const PORT = process.env.PORT;

const users = [
  { id: 1, title: 'um' },
  { id: 2, title: 'dois' },
  { id: 3, title: 'três' },
];

const server = createServer((req, res) => {
  const url = req.url;
  const METHOD = req.method;
  const urlMETHOD = url + METHOD;
  const id = url.slice(5);

  if (urlMETHOD.match(/\/api\/usersGET/)) {
    send(res, users, 200);
  } else if (urlMETHOD.match(/\/api\/[0-9]GET/)) {
    send(res, users.filter(user => user.id === parseInt(id)), 200);
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