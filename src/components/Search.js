import React, { useState, useEffect } from 'react';
import '../styles/Search.css'; // Import your CSS file

function Search() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length > 0) {
      // Make requests to the Spotify API with the partial query
      // Update the 'suggestions' state with the results
      // Display the suggestions in the UI
    } else {
      // Clear the suggestions when the query is empty
      setSuggestions([]);
    }
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    // Set the search bar value to the clicked suggestion
    setQuery(suggestion);
    // Initiate the search or perform other actions
  };

  return (
    <div className="search-container"> {/* Apply the container class */}
      <input
        type="text"
        placeholder="Search for music..."
        value={query}
        onChange={handleInputChange}
        className="search-input" // Apply the input class
      />
      <ul className="suggestions-container"> {/* Apply the suggestions container class */}
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="suggestion-item" // Apply the suggestion item class
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
