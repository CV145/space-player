// SpotifyLoginButton.js
import React, {useContext} from 'react';
import '../styles/SpotifyLoginButton.css';
import spotifyLogo from '../assets/images/spotify.png';
import { getAccessTokenFromRedirectURI, initiateSpotifyLogin } from './authentication/SpotifyAuth'; 
import {AppContext} from '../AppContext';




const SpotifyLoginButton = () => {
  const { setAccessToken } = useContext(AppContext);

  const onLoginClick = () => {
    // Redirect to the Spotify authorization page
    initiateSpotifyLogin();

    //Get and store access token 
    const token = getAccessTokenFromRedirectURI();

    if (token)
    {
      setAccessToken(token);
    }
    else
    {
      throw Error ("There was an error logging in");
    }
  };

  return (
    <button onClick={onLoginClick} className="spotify-login-button">
      <img src={spotifyLogo} style={{width: '45px', height: '45px'}} />
    </button>
  );
};




export default SpotifyLoginButton;

/*
The data flow for authentication typically follows these steps:
- User clicks the Spotify login button.
- The application opens a popup or redirects the user to the Spotify authorization page.
- After successful authentication, the user is redirected back to your application with an authorization code.
- Your application extracts the code, exchanges it for an access token, and stores it securely.
- The access token is used to make requests to the Spotify API on behalf of the user.
*/
