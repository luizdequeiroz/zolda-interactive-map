// src/components/Search.js
import React, { useState } from 'react';
import locations from '../database';
import '../styles.css'; // Importar o arquivo CSS

function Search({ setCenter, setPopupInfo }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      const filteredSuggestions = locations.filter(location =>
        location.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (location) => {
    setCenter([location.lat, location.lng]);
    setPopupInfo(location);
    setQuery(location.name);
    setSuggestions([]);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Pesquisar local"
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((location, index) => (
            <li
              key={index}
              onClick={() => handleSelect(location)}
            >
              {location.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
