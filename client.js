import { createInterface } from 'node:readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'COMMAND> ',
});

rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'users':
      fetch('http://localhost:8787/api/users').then(res => res.json()).then(json => console.log(json)).catch(console.error);
      break;
    case 'create':
      fetch('http://localhost:8787/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: new Date().getTime(),
          title: new Date().getTime().toString()
        })
      }).catch(console.error);
      break;
    default:
      console.log(`? ${line.trim()}'`);
      break;
  }
  rl.prompt();
}).on('close', () => {
  process.exit(0);
});


/* const get = async () => {
  const promi = await fetch('http://localhost:8787/api/users');
  const json = await promi.json();
  console.log(json);
}

get().catch(console.error) */

/* 
const data = {
  id: 15,
  title: 'fifteen'
};

const put = {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
};

const del = {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
};

fetch('http://localhost:8787/api/users', del).catch(console.error);  */
