import { DatabaseSync } from 'node:sqlite';

const database = new DatabaseSync('usersdb');

export const createTable = () => {
  database.exec(`
  CREATE TABLE data(
  id INTEGER PRIMARY KEY,
  title TEXT
  )STRICT
  `);
};


export const insertData = () => {
  const insert = database.prepare('INSERT INTO data (id, title) VALUES (?, ?)');
  insert.run(1, 'um');
  insert.run(2, 'dois');
  insert.run(3, 'três');
  insert.run(4, 'quatro');
  insert.run(5, 'cinco');
  insert.run(6, 'seis');
  insert.run(7, 'sete');
  insert.run(8, 'oito');
  insert.run(9, 'nove');
  insert.run(10, 'dez');
};

export const deleteUser = (id) => {
  const update = database.prepare('DELETE FROM data WHERE id = ?');
  update.run(id);
};

export const updateUser = (user) => {
  const update = database.prepare('UPDATE data SET title = ? WHERE id = ?');
  update.run(user.title, user.id);
};

export const createUser = (newUser) => {
  const insert = database.prepare('INSERT INTO data (id, title) VALUES (?, ?)');
  insert.run(newUser.id, newUser.title);
};

export const getUsers = () => {
  const query = database.prepare('SELECT * FROM data ORDER BY id');
  return query.all();
};

export const getUser = id => {
  const query = database.prepare(`SELECT * FROM data WHERE id=${id}`);
  return query.get();
};



