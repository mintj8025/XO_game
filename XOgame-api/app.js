const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 7000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'xo_game'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS games (
      id INT AUTO_INCREMENT PRIMARY KEY,
      board TEXT,
      size INT,
      moves TEXT,
      winner VARCHAR(1),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  connection.query(createTableQuery, (err, results, fields) => {
    if (err) {
      console.error('Error creating table: ' + err.stack);
      return;
    }
    console.log('Table created or exists already');
  });
});

app.post('/api/save-game', (req, res) => {
  const { board, size, moves, winner } = req.body;
  const query = 'INSERT INTO games (board, size, moves, winner) VALUES (?, ?, ?, ?)';
  connection.query(query, [JSON.stringify(board), size, JSON.stringify(moves), winner], (err, results) => {
    if (err) {
      console.error('Error saving game: ' + err.stack);
      res.status(500).send('Error saving game');
      return;
    }
    res.status(201).send('Game saved');
  });
});

app.get('/api/games', (req, res) => {
  const query = 'SELECT * FROM games ORDER BY created_at DESC';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching games: ' + err.stack);
      res.status(500).send('Error fetching games');
      return;
    }
    res.json({ results });
  });
});

app.get('/api/games/:id', (req, res) => {
  const gameId = req.params.id;
  const query = 'SELECT * FROM games WHERE id = ?';
  connection.query(query, [gameId], (err, results) => {
    if (err) {
      console.error('Error fetching game: ' + err.stack);
      res.status(500).send('Error fetching game');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Game not found');
      return;
    }
    res.json(results[0]);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
