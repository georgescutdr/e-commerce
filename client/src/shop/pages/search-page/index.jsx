import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { shopConfig } from '../../../config';
import { ItemGrid } from '../../components/item-grid';
import { SearchPanel } from '../../components/search-panel';
import { ChipsBar } from '../../components/search/chips-bar';
import './search-page.css';

const SearchPage = () => {
  const { search, categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState({});
  const navigate = useNavigate();

  // Update selected from URL (only set state inside useEffect!)
  useEffect(() => {
    console.log('Current searchParams:', searchParams);  // Log the searchParams to check

    const parsed = {};
    // Parse query parameters from the URL
    for (const [key, value] of searchParams.entries()) {
      const entries = value.split(',').map((entry) => {
        const [id, label] = entry.split(':');
        return { id: isNaN(id) ? id : Number(id), label: decodeURIComponent(label || '') };
      });
      parsed[key] = entries;
    }

    console.log('Parsed filters:', parsed);  // Log the parsed filters

    setSelected(parsed);
  }, [searchParams]);

  // Fetch search results when either selected filters, search, or categoryId changes
  useEffect(() => {
    const buildFiltersForBackend = () => {
      const filters = [];
      // Combine selected filters and send to backend
      for (const [key, values] of Object.entries(selected)) {
        if (Array.isArray(values) && values.length > 0) {
          filters.push({
            name: key,
            values: values.map((v) => v.id),
          });
        }
      }
      return filters;
    };

    const fetchSearchResults = async () => {
      const query = search?.trim() || '';  // Check if search is defined, and provide a fallback

      // Log the filters before sending to the backend
      const filtersForBackend = buildFiltersForBackend();
      console.log('Filters for backend:', filtersForBackend);

      const combinedParams = {
        query,  // Use the query variable here
        categoryId,
        filters: JSON.stringify(filtersForBackend),  // Ensure filters are serialized as a string
      };

      console.log('Combined parameters sent to backend:', combinedParams);

      setLoading(true);
      setError(null);
      try {
        const res = await Axios.get(shopConfig.api.searchApiUrl, {
          params: combinedParams,
        });
        const data = res?.data;
        console.log(data);
        setResults(Array.isArray(data.products) ? data.products : []);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to fetch search results. Please try again later.');
      } finally {
        setLoading(false);
      }
    };



    fetchSearchResults();
  }, [selected, search, categoryId]);

  const handleRemoveChip = (attrName, label) => {
    const updated = { ...selected };
    updated[attrName] = updated[attrName].filter((v) => v.label !== label);
    if (updated[attrName].length === 0) {
      delete updated[attrName];
    }

    const newParams = new URLSearchParams();
    for (const [key, values] of Object.entries(updated)) {
      const encoded = values.map((v) => `${v.id}:${encodeURIComponent(v.label)}`).join(',');
      newParams.set(key, encoded);
    }

    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    // Clear the selected filters state
    setSelected({});

    // Reset the search parameters in the URL
    const newParams = new URLSearchParams();
    setSearchParams(newParams);
  };

  return (
    <div className="search-page">
      <div className="search-panel-col">
        <SearchPanel categoryId={categoryId} selected={selected} setSelected={setSelected} />
      </div>
      <div className="item-list-col">
        <h2>
          Search Results for: <span className="highlight">{search}</span>
        </h2>

        <ChipsBar selected={selected} onRemove={handleRemoveChip} onClearAll={clearAllFilters} />

        {loading && <p>Loading...</p>}

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}

        {!loading && !error && results.length === 0 && <p>No results found.</p>}

        {!loading && !error && results.length > 0 && (
          <div className="results-list">
            <ItemGrid items={results} props={{ table: 'product' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
