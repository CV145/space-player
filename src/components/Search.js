import React, { useState } from 'react';
import axios from 'axios';

function Search({ token }) {
    const [query, setQuery] = useState('');
    const [song, setSong] = useState(null);

    const searchSong = async () => {
        try {
            const response = await axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    q: query,
                    type: "track",
                    limit: 1
                }
            });

            if (response.data.tracks.items.length > 0) {
                setSong(response.data.tracks.items[0]);
            } else {
                setSong(null);
            }
        } catch (error) {
            console.error('Error fetching song:', error);
            setSong(null);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a song"
            />
            <button onClick={searchSong}>Search</button>

            {song && (
                <div>
                    <h3>{song.name}</h3>
                    <p>Artist: {song.artists.map(artist => artist.name).join(", ")}</p>
                    <p>Album: {song.album.name}</p>
                    {/* Additional song information can be rendered here */}
                </div>
            )}
        </div>
    );
}

export default Search;
