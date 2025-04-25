import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { shopConfig } from '../../../config';
import './search-bar.css';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

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
      setSuggestions([]);
      navigate(`/search/${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setSuggestions([]);
    }
  };

  // Hide dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-autocomplete" ref={wrapperRef}>
      <input
        ref={inputRef}
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
          {suggestions.map((word, index) => {
            const regex = new RegExp(`(${query})`, 'gi');
            const highlighted = word.replace(regex, match => `<strong>${match}</strong>`);

            return (
              <li
                key={index}
                onClick={() => handleSelect(word)}
                dangerouslySetInnerHTML={{ __html: highlighted }}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};
