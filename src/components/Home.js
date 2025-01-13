import React from 'react';
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">
      <h1>Today's Match</h1>
      <div className="image-container">
        <img src="images.jpg" className="Cricket_image" alt="Cricket Match 1" />
        <img src="image1.jpg" className="Cricket_image" alt="Cricket Match 2" />
        <img src="image2.jpg" className="Cricket_image" alt="Cricket Match 3" />
        <img src="image3.jpg" className="Cricket_image" alt="Cricket Match 4" />
      </div>
      <h1>Players</h1>
    </div>

  );
}

export default Home;
