import { useState, useEffect } from 'react';
import '../App.css';
import Title from './Title';
import Stats from './Stats';
import Cards from './Cards';
import GameOver from './GameOver';

let overlayStyle = {
  visibility: 'hidden',
  opacity: '0%'
};

let modalStyle = {
  transform: 'translate(0%, 0%)'
};

function GameComponent() {
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState('');
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);

  useEffect(() => {
    if (gameState === 'next level') {
      setLevel(level + 1);
    }

    return () => {
      setGameState('');
    };
  }, [gameState, level]);

  useEffect(() => {
    if (gameState === 'game over') {
      overlayStyle = { opacity: '100%' };
      modalStyle = { transform: 'translate(0%, 50%)' };
  
      // Get user highscore from backend
      fetch('http://localhost:5000/highscore')
        .then(response => response.json())
        .then(data => {
          const highScoreFromServer = data.highscore || 0;
  
          if (score > highScoreFromServer) {
            // If new highscore then sent it to backend
            fetch('http://localhost:5000/score', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ score })
            })
            .then(response => response.json())
            .then(data => console.log('Nuovo record salvato:', data))
            .catch(error => console.error('Errore nell’invio del punteggio:', error));
          }
        })
        .catch(error => console.error('Errore nel recupero dell’highscore:', error));
    }
  
    return () => {
      overlayStyle = { visibility: 'hidden', opacity: '0%' };
      modalStyle = { transform: 'translate(0%, 0%)' };
    };
  }, [gameState, score]);

  useEffect(() => {
    if (score > highestScore) {
      setHighestScore(score);
    }
  }, [score, highestScore]);

  const resetGame = () => {
    setGameState('new game');
    setScore(0);
    setLevel(1);
  };

  return (
    <>
      <header>
        <Title />
        <Stats level={level} score={score} highestScore={highestScore} />
      </header>
      <main>
        <Cards 
          level={level} 
          gameState={gameState} 
          setGameState={setGameState} 
          setScore={setScore} 
          score={score}
        />
      </main>
      <GameOver 
        highestScore={highestScore} 
        overlayStyle={overlayStyle} 
        modalStyle={modalStyle} 
        resetGame={resetGame}
      />
    </>
  );
}

export default GameComponent;
