import React from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const handleStartClick = async () => {
    try {
      const video = document.createElement('video');
      video.style.display = 'none';
      document.body.appendChild(video);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const image = canvas.toDataURL('image/png', 1.0);

      await axios.post('/api/screenshot', { image });

      stream.getTracks().forEach(track => track.stop());
      video.remove();
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  return (
    <div className="app">
      <button className="start-button" onClick={handleStartClick}>Start</button>
    </div>
  );
};

export default App;
