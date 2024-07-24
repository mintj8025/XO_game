import React from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import './App.css';

function App() {

  const handleGame = (event) => {
    window.location = '/Game';
  }

  return (
    <div className="container">
      <div className="App">
        <Typography variant="h1" component="h2" className="title">
          XO
        </Typography>
        <Typography variant="h4" component="h2" className="subtitle">
          Choose your play mode
        </Typography>
      </div>
      <div className="button-container">
        <Button 
          onClick={handleGame} 
          variant="contained" 
          sx={{
            backgroundColor: '#4CAF50',
            color: 'white',
            '&:hover': {
              backgroundColor: '#45a049',
            },
          }}
          className="new-game-button"
        >
          With a friend
        </Button>
      </div>
    </div>
  );
}

export default App;
