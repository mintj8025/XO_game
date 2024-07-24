import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Game.css';

const createBoard = (size) => {
  return Array(size).fill(null).map(() => Array(size).fill(null));
};

const checkWinner = (board, size) => {
  const lines = [];

  // Rows
  for (let i = 0; i < size; i++) {
    lines.push(board[i]);
  }

  // Columns
  for (let i = 0; i < size; i++) {
    const column = [];
    for (let j = 0; j < size; j++) {
      column.push(board[j][i]);
    }
    lines.push(column);
  }

  // Diagonals
  const diagonal1 = [];
  const diagonal2 = [];
  for (let i = 0; i < size; i++) {
    diagonal1.push(board[i][i]);
    diagonal2.push(board[i][size - i - 1]);
  }
  lines.push(diagonal1, diagonal2);

  // Check for winner
  for (let line of lines) {
    if (line.every(cell => cell === 'X')) return 'X';
    if (line.every(cell => cell === 'O')) return 'O';
  }

  return null;
};

const App = () => {
  const [size, setSize] = useState(3);
  const [board, setBoard] = useState(createBoard(size));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/games');
      setHistory(response.data.results);
    } catch (error) {
      console.error('Error fetching data: ' + error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleClick = (i, j) => {
    if (board[i][j] || winner) return;

    const newBoard = board.map(row => row.slice());
    newBoard[i][j] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    const newWinner = checkWinner(newBoard, size);
    setWinner(newWinner);

    if (newWinner) {
      const moves = [];
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (newBoard[r][c]) {
            moves.push({ row: r, col: c, player: newBoard[r][c] });
          }
        }
      }
      saveGame(newBoard, size, moves, newWinner);
    }
  };

  const handleSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    if (isNaN(newSize) || newSize < 3 || newSize > 10) {
      alert("Please enter a valid size between 3 and 10.");
      return;
    }
    setSize(newSize);
    setBoard(createBoard(newSize));
    setXIsNext(true);
    setWinner(null);
  };

  const saveGame = async (board, size, moves, winner) => {
    await axios.post('http://localhost:7000/api/save-game', {
      board,
      size,
      moves,
      winner
    });
    fetchHistory(); // Refresh history after saving the game
  };

  const loadGame = async (gameId) => {
    const response = await axios.get(`http://localhost:7000/api/games/${gameId}`);
    const { board, size, moves, winner } = response.data;
    setSize(size);
    setBoard(board);
    setXIsNext(moves.length % 2 === 0);
    setWinner(winner);
  };

  const newGame = async () => {
    setBoard(createBoard(size));
    setXIsNext(true);
    setWinner(null);
    await fetchHistory(); // Refresh history after starting a new game
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <label>
        Board Size:
        <input type="number" value={size} onChange={handleSizeChange} min="3" max="10" />
      </label>
      <button onClick={newGame} className="new-game-button">New Game</button>
      <div
        className="board"
        style={{
          gridTemplateColumns: `repeat(${size}, 50px)`,
          gridTemplateRows: `repeat(${size}, 50px)`
        }}
      >
        {board.map((row, i) =>
          row.map((cell, j) => (
            <button
              key={`${i}-${j}`}
              className="cell"
              onClick={() => handleClick(i, j)}
            >
              {cell}
            </button>
          ))
        )}
      </div>
      {winner && <h2>Winner: {winner}</h2>}
      <h2>Game History</h2>
      <ul>
        {history.map(game => (
          <li key={game.id} onClick={() => loadGame(game.id)}>
            Game played on {new Date(game.created_at).toLocaleString()} - Winner: {game.winner}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
