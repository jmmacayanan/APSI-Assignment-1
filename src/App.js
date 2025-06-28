import './App.css';
import React, { useState } from 'react';

const imageUrls = [
  { url: 'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768', type: 'banana' },
  { url: 'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg', type: 'chicken' }
];

// Fisher-Yates shuffle algorithm
function shuffle(array) {
  const arr = [...array]; // make a copy
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function App() {
  const [images, setImages] = useState(() => {
    const chickenImages = Array(18).fill({ url: imageUrls[1].url, type: 'chicken' });
    const bananaImages = Array(18).fill({ url: imageUrls[0].url, type: 'banana' });
    return shuffle([...chickenImages, ...bananaImages]);
  });
  const [revealed, setRevealed] = useState(Array(36).fill(false));
  const [player1Choice, setPlayer1Choice] = useState(null); // banana or chicken
  const [player2Choice, setPlayer2Choice] = useState(null); // opposite of player1Choice
  const [gameResult, setGameResult] = useState(null); // null, 'Player 1 loses', 'Player 2 loses', 'won'
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const handleChoice = (choice) => {
    setPlayer1Choice(choice);
    setPlayer2Choice(choice === 'banana' ? 'chicken' : 'banana');
  };

  const handleSquareClick = (img, index) => {
    if (!player1Choice || revealed[index] || gameResult) return;

    const playerChoice = currentPlayer === 1 ? player1Choice : player2Choice;

    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

    if (img.type === playerChoice) {
      const remaining = images.some(
        (square, i) => !newRevealed[i] && square.type === playerChoice
      );
      if (!remaining) {
        setGameResult('won');
      } else {
        setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
      }
    } else {
      setGameResult(`Player ${currentPlayer} loses`);
    }
  };

  const handleRestart = () => {
    const chickenImages = Array(18).fill({ url: imageUrls[1].url, type: 'chicken' });
    const bananaImages = Array(18).fill({ url: imageUrls[0].url, type: 'banana' });
    const combinedImages = shuffle([...chickenImages, ...bananaImages]);
    setImages(combinedImages);
    setRevealed(Array(36).fill(false));
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setGameResult(null);
    setCurrentPlayer(1);
  };

  return (
    <div className="container">
      <h1>Chicken Banana Minesweeper (Turn-Based)!</h1>

      {!player1Choice && (
        <div className="choices">
          <p>Player 1, choose your target:</p>
          <button onClick={() => handleChoice('chicken')}>Chicken</button>
          <button onClick={() => handleChoice('banana')}>Banana</button>
        </div>
      )}

      {player1Choice && !gameResult && (
        <div className="choices">
          <p>Player 1 chose: <strong>{player1Choice}</strong></p>
          <p>Player 2 must find: <strong>{player2Choice}</strong></p>
          <p>Current Turn: <strong>Player {currentPlayer}</strong></p>
        </div>
      )}

      <div className="grid">
        {images.map((img, index) => (
          <div
            key={index}
            className="square"
            onClick={() => handleSquareClick(img, index)}
          >
            {revealed[index] ? (
              <img
                src={img.url}
                alt={img.type}
                className="square-visible"
              />
            ) : (
              <div className="square-hidden" />
            )}
          </div>
        ))}
      </div>

      {gameResult && (
        <div className="status">
          {gameResult === 'won' ? (
            <p>Congratulations! <strong>You both won!</strong></p>
          ) : (
            <p>{gameResult}. <strong>Game Over!</strong></p>
          )}
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default App;
