// SpotifyPlayerContainer.js

import React, { useEffect, useState } from 'react';
import MusicPlayer from './MusicPlayer';
import Search from './Search';

function SpotifyPlayerContainer() {
  const CLIENT_ID=process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const REDIRECT_URI =process.env.REACT_APP_SPOTIFY_REDIRECT_URI 
   const AUTH_ENDPOINT =process.env.REACT_APP_SPOTIFY_AUTH_ENDPOINT 
   const RESPONSE_TYPE = process.env.REACT_APP_SPOTIFY_RESPONSE_TYPE

   const [token, setToken] = useState("");

   useEffect(() => { 
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (hash && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
        window.location.hash = "";
        window.localStorage.setItem("token", token);
    }

    setToken(token)
}, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };


  return (
    <div>
      <MusicPlayer token={token}/>
      <Search token={token}/>
    </div>
  );
}

export default SpotifyPlayerContainer;
