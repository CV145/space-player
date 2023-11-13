import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../AppContext';
import SpotifyLoginButton from './SpotifyLoginButton';
import { Button, Slider, Typography, IconButton, Box } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';


const MusicPlayerContainer = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '400px', // Set a fixed width
    height: '300px', // Set a fixed height
    margin: 'auto', // This centers the Card horizontally
    position: 'absolute',
    top: '50%', // Center vertically
    left: '50%',
    transform: 'translate(-50%, -50%)', // Adjust for exact centering
    padding: '20px',
    border: '1px solid darkgrey',
    borderRadius: '4px',
    backgroundColor: '#f5f5f5',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  });
  
  
  const PlaylistDisplay = styled(Typography)({
    // Custom styles
    marginBottom: '20px'
  });
  
  const PlayerControls = styled(Box)({
    // Custom styles
    display: 'flex',
    alignItems: 'center',
    gap: '55px'
  });

  const SpotifyButtonContainer = styled('div')({
    position: 'fixed',
    right: '20px', // Adjust the spacing as needed
    bottom: '20px', // Adjust the spacing as needed
  });

  const PlaylistContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30vh', // Adjust as needed, this takes the full height of the viewport
    width: '30%', // Takes the full width
  });
  

function MusicPlayer() {
    const { accessToken, trackId } = useContext(AppContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const [player, setPlayer] = useState(null);
    const [volume, setVolume] = useState(30); // Initial volume, adjust as needed

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };

    useEffect(() => {
        if (accessToken && window.Spotify) {
            const spotifyPlayer = new window.Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: cb => { cb(accessToken); },
            });

            // Set up the player
            spotifyPlayer.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            spotifyPlayer.connect();
            setPlayer(spotifyPlayer);
        }
    }, [accessToken]);

    const togglePlay = () => {
        if (!player) return;

        if (isPlaying) {
            player.pause();
        } else {
            player.resume(); // This resumes the current track
            // If you want to play a specific track:
            // player.play({ uris: [`spotify:track:${trackId}`] });
        }

        setIsPlaying(!isPlaying);
    };

    return (
        <MusicPlayerContainer>

            <PlaylistContainer>
      <div>
      <PlaylistDisplay variant="h3">Playlist</PlaylistDisplay>
      <PlayerControls>
                <IconButton onClick={togglePlay} color="primary">
                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <Box display="flex" alignItems="center" gap="10px"> {/* Add gap for spacing */}
      <VolumeUpIcon />
      <Slider
    value={volume}
    onChange={handleVolumeChange}
    aria-labelledby="continuous-slider"
    style={{ width: 200 }} // Adjust width as needed
/>

    </Box>
            </PlayerControls>
      </div>
    </PlaylistContainer>

            
            <SpotifyButtonContainer>
                <SpotifyLoginButton />
            </SpotifyButtonContainer>
        </MusicPlayerContainer>
    );
}

export default MusicPlayer;
