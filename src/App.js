import './App.css';
import Counter from './Counter';
import React, { useState } from 'react'; 

// function Welcome(props){
// 	return <h2>Welcome, {props.name}!</h2>;
// }

const imageUrls = [
  'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768',
  'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg', 
];

function getRandomImage() {
  const index = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[index];
}


function App() {
  const [images, setImages] = useState(Array(36).fill().map(getRandomImage));
  const handleClick = () => {
    setImages(images.map(() => getRandomImage()));
  };
  return (
    <div className="container">
      <h1> Chicken Banana Game!</h1>
      <div className="choices">
      <button>Chicken</button>
      <button>Banana</button>
      </div>
      <div className="grid">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Random"
            className="square-visible"
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

// {/* <Welcome name="Tralalelo Tralala"/>
//       <Welcome name="Tung Tung Tung Tung Sahur"/>
//       <Welcome name="Assassino Cappucino"/> */}