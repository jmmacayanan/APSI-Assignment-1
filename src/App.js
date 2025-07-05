import './App.css';
import React, { useState } from 'react';

const imageUrls = [
  { url: 'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768', type: 'banana' },
  { url: 'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg', type: 'chicken' },
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
  const [playerChoice, setPlayerChoice] = useState(null); // 'banana' or 'chicken'
  const [gameResult, setGameResult] = useState(null); // null, 'Player loses', 'won'
  
  const handleChoice = (choice) => {
    setPlayerChoice(choice);
  };

  const handleSquareClick = (img, index) => {
    if (!playerChoice || revealed[index] || gameResult) return;

    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

    if (img.type === playerChoice) {
      // Check if all target images for the current player have been revealed
      const remaining = images.some(
        (square, i) => !newRevealed[i] && square.type === playerChoice
      );
      if (!remaining) {
        setGameResult('won');
      }
    } else {
      setGameResult('Player loses!');
    }
  };

  const handleRestart = () => {
    const chickenImages = Array(18).fill({ url: imageUrls[1].url, type: 'chicken' });
    const bananaImages = Array(18).fill({ url: imageUrls[0].url, type: 'banana' });
    const combinedImages = shuffle([...chickenImages, ...bananaImages]);
    setImages(combinedImages);
    setRevealed(Array(36).fill(false));
    setPlayerChoice(null);
    setGameResult(null);
  };

  return (
    <div className="container">
      <h1>Chicken Banana Minesweeper!</h1>

      {!playerChoice && (
        <div className="choices">
          <p>Choose your target:</p>
          <button onClick={() => handleChoice('chicken')}>Chicken</button>
          <button onClick={() => handleChoice('banana')}>Banana</button>
        </div>
      )}

      {playerChoice && !gameResult && (
        <div className="choices">
          <p>Player chose: <strong>{playerChoice}</strong></p>
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
              <div className="square-hidden">{index + 1}</div>
              
            )}
          </div>
        ))}
      </div>

      {gameResult && (
        <div className="status">
          {gameResult === 'won' ? (
            <p>Congratulations! <strong>You won!</strong></p>
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
