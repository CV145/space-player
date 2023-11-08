// SpotifyPlayerContainer.js

import React, { useEffect } from 'react';
import { initializeSpotifySDK } from '../services/spotifyService';
import SpaceBackground from './SpaceBackground';
import {getAccessTokenFromRedirectURI} from './authentication/SpotifyAuth'
import MusicPlayer from './MusicPlayer';
import Search from './Search';

function SpotifyPlayerContainer() {
  useEffect(() => {
    const accessToken = getAccessTokenFromRedirectURI();

    initializeSpotifySDK(accessToken)
      .then((player) => {
        // Do something with the player (e.g., add event listeners)
      })
      .catch((error) => {
        console.error('Error initializing Spotify SDK:', error);
      });
  }, []);

  return (
    <div>
      <MusicPlayer/>
      <Search/>
    </div>
  );
}

export default SpotifyPlayerContainer;
