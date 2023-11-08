import React from 'react';
import ReactDOM from 'react-dom';
import SpaceBackground from './components/SpaceBackground'; // Import your SpaceBackground component
import SpotifyPlayerContainer from './components/SpotifyPlayerContainer';
import { AppProvider } from './AppContext';


// Initialize the Spotify SDK when your application starts
window.onSpotifyWebPlaybackSDKReady = () => {
  const token = '[Your access token]';
  const player = new window.Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: (cb) => {
      cb(token);
    },
    volume: 0.5
  });
}

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
    <SpaceBackground/>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
