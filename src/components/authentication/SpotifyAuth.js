export const initiateSpotifyLogin = (clientId, redirectUri, scopes) => {
    // Use provided parameters or default values
    const finalRedirectUri = redirectUri || 'http://localhost:3000/callback';
    const finalScopes = scopes || 'user-read-private'; // Replace with desired scopes
    const finalClientId = clientId ||  'aff230c795e442cebe5c2b5275d10980'; // Replace with your Spotify client ID

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${finalClientId}&redirect_uri=${finalRedirectUri}&scope=${finalScopes}&response_type=token`;

    // Redirect the user to the Spotify authorization page
    window.location.href = authUrl;
};

export const getAccessTokenFromRedirectURI = () => {
    console.log("Getting access token");
    const fragment = window.location.hash.substring(1); // Remove the '#' symbol
    const params = new URLSearchParams(fragment);

    // Check if the access token exists in the URL fragment
    if(params.has('access_token')) {
        return params.get('access_token');
    } else {
        console.error('Access token not found in URL fragment.');
        return null;
    }
};
