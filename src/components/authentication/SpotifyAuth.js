// SpotifyAuth.js

export const initiateSpotifyLogin = () => {
    const redirectUri = 'http://localhost:3000/callback';
    const scopes = 'user-read-private'; // Replace with the desired scopes
    const clientId = 'aff230c795e442cebe5c2b5275d10980'; // Replace with your Spotify client ID

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token`;

    // Redirect the user to the Spotify authorization page
    window.location.href = authUrl;
};

export const getAccessTokenFromRedirectURI = () => {
    const fragment = window.location.hash.substring(1); // Remove the '#' symbol
    const params = new URLSearchParams(fragment);
    return params.get('access_token');
};

// Call this function when your application loads to check for the access token
const accessToken = getAccessTokenFromRedirectURI();

if (accessToken) {
    // You have the access token, you can now use it in your application.
    console.log('Access Token:', accessToken);
}
