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

  if (isNaN(id) || users.filter(user => user.id === parseInt(id)).length === 0) {
    send(res, { message: 'not found' }, 404)
  } else {
    switch (urlMETHOD) {
      case '/api/usersGET':
        send(res, users, 200);
        break;
      case `/api/${id}GET`:
        send(res, users.filter(user => user.id === parseInt(id)), 200);
        break;
      default:
        send(res, { message: 'not found' }, 404)
    };
  }
});

const send = (res, data, statusCode) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = statusCode;
  res.write(JSON.stringify(data));
  res.end();
};

server.listen(PORT, () => { });