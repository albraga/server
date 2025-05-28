import fs from 'node:fs'

fs.readFile('./test.txt', 'utf8', (err, data) => {
  if(err) throw err;
  console.log(data);
})

//console.log(fs.readFileSync('./test.txt', 'utf8'));