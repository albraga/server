import http from 'node:http';
import fs from 'node:fs/promises';
import url from 'node:url';
import path from 'node:path';

const PORT = process.env.PORT;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      page(path.join(__dirname, 'public', 'index.html'), res);
      break;
    case '/about':
      page(path.join(__dirname, 'public', 'about.html'), res);
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>Not found</h1>')
  }
});

server.listen(PORT, () => {});

const page = async (filePath, res) => {
  const data = await fs.readFile(filePath);
  res.setHeader('Content-Type', 'text/html');
  res.write(data);
  res.end();
}