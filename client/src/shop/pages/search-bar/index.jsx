// src/components/SearchAutocomplete.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { shopConfig } from '../../../config'
import './search-bar.css';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await Axios.get(shopConfig.api.searchAutocompleteUrl, {
        params: { query: searchQuery }
      });
      setSuggestions(res.data?.suggestions || []);
    } catch (err) {
      console.error('Autocomplete error:', err);
      setSuggestions([]);
    }
  };

  const handleSelect = (word) => {
    setQuery(word);
    setSuggestions([]);
    navigate(`/search/${encodeURIComponent(word)}`);
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-autocomplete">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="Search..."
      />
      <button className="search-button" onClick={handleSearch}>
        <i className="pi pi-search" />
      </button>

      {suggestions.length > 0 && (
        <ul className="autocomplete-dropdown">
          {suggestions.map((word, index) => (
            <li key={index} onClick={() => handleSelect(word)}>
              {word}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

