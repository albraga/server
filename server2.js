import { createServer } from 'node:http';

const PORT = process.env.PORT;

const users = [
  { id: 1, title: 'um' },
  { id: 2, title: 'dois' },
  { id: 3, title: 'três' },
];

const server = createServer((req, res) => {
  const urlMETHOD = req.url + req.method;
  switch (urlMETHOD) {
    case '/api/usersGET':
      send(res, users, 200);
      break;
    default:
      send(res, {message: 'not found'}, 404)
  };
});

const send = (res, data, statusCode) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = statusCode;
  res.write(JSON.stringify(data));
  res.end();
};

server.listen(PORT, () => { });