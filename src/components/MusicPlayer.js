import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../AppContext';
import SpotifyLoginButton from './SpotifyLoginButton';
import { Button, Slider, Typography, IconButton, Box } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';
import {debounce} from 'lodash';
import { getRecommendations } from '../services/spotifyService';


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
            const [searchQuery, setSearchQuery] = useState('');
            const [recommendations, setRecommendations] = useState([]);
            const [selectedSong, setSelectedSong] = useState(null); // State for the selected song


            const searchContainerRef = useRef(null); // Ref for the search bar container


            // Function to handle song selection
            const handleSongSelect = (song) => {
                setSelectedSong(song);
                setRecommendations([]); // Optionally clear recommendations after selection
            };
            
            
            // Debounced function to fetch song recommendations
            const fetchRecommendations = debounce(async (query) => {
                if (!query) {
                    setRecommendations([]);
                    return;
                }
                try {
                    const response = await getRecommendations(query);
                    setRecommendations(response);
                    } catch (error) {
                        console.error('Error fetching recommendations:', error);
                        // Optionally handle the error in the UI
                    }
                    }, 500); // Waits 500ms after the user stops typing
                    
                    
                    const handleVolumeChange = (event, newValue) => {
                        setVolume(newValue);
                    };
                    
                    useEffect(() => {
                        fetchRecommendations(searchQuery);
                        
                        
                        const handleClickOutside = (event) => {
                            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                              setRecommendations([]);
                            }
                          };
                      
                          // Attach the event listener
                          document.addEventListener('mousedown', handleClickOutside);
                      
                          // Cleanup the event listener
                          return () => {
                            document.removeEventListener('mousedown', handleClickOutside);
                          };
                        
                        }, [searchQuery]);
                        
                        const ref = useRef(null);
                        
                        const handleSearchChange = (event) => {
                            setSearchQuery(event.target.value);
                        };
                        
                        const togglePlay = () => {
                            setIsPlaying(!isPlaying);
                        };
                        
                        return (
                        <MusicPlayerContainer>
                        <PlaylistContainer>
                        <div ref={searchContainerRef} style={{ position: 'relative' }}>
                        {/* Display selected song */}
                        {selectedSong && (
                            <div>
                            <strong>Selected Song:</strong> {selectedSong.name}
                            </div>
                        )}

                        
                        {/* Search Bar */}
                        <input
                            type="text"
                            placeholder="Search for a song"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />

                        {/* Recommendation Box */}
                        {recommendations.length > 0 && (
                            <div style={recommendationBoxStyle}>
                            {recommendations.map((song) => (
                                <div key={song.id} onClick={() => handleSongSelect(song)}>
                                {song.name}
                                </div>
                            ))}
                            </div>
                        )}
                        
                        
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
                                
                                
        // Style for the recommendation box
        const recommendationBoxStyle = {
            position: 'absolute',
            top: '100%', // Positioning below the search bar
            left: 0,
            right: 0,
            maxHeight: '200px', // Adjust as needed
            overflowY: 'auto', // Makes it scrollable
            backgroundColor: 'white',
            border: '1px solid #ddd',
            zIndex: 1000, // Ensures it's above other content
            // Add more styling as needed
        };
        
        export default MusicPlayer;
                                