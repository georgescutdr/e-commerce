import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { ViewToggleButtons } from '../../components/view-toggle-buttons'
import { ItemGridSkeleton } from '../../components/skeleton/item-grid-skeleton'
import { ItemStackSkeleton } from '../../components/skeleton/item-stack-skeleton'
import { shopConfig } from '../../../config';
import { ItemGrid } from '../../components/item-grid';
import { SearchPanel } from '../../components/search-panel';
import { ChipsBar } from '../../components/search/chips-bar';
import { Header } from '../../components/header';
import { ItemStack } from '../../components/item-stack'
import Cookies from 'js-cookie'
import './search-page.css';

const SearchPage = ({props}) => {
  const { search, categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState({});
  const [viewLoading, setViewLoading] = useState(false)
  const navigate = useNavigate();

  const [viewMode, setViewModeState] = useState(() => Cookies.get('viewMode') || 'grid')

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
        setResults(data);
      } catch (err) {
        console.error('Search error:', err);
        
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

  const setViewMode = (mode) => {
        setViewLoading(true)
        Cookies.set('viewMode', mode, { expires: 7 })
        setTimeout(() => {
            setViewModeState(mode)
            setViewLoading(false)
        }, 300) // 300ms delay for smooth transition
    }

  return (
    <>
    <Header categoryId={categoryId} searchWords={search} />
    <div className="items-page">
    <div className="items-header">
        <div className="items-header-text">
            <h1>Search Results for: <span className="highlight">{search}</span></h1>
        </div>
        <ViewToggleButtons viewMode={viewMode} setViewMode={setViewMode} />
    </div>
    <div className="items-content-wrapper">

      <div className="search-panel-container">
        <SearchPanel 
          categoryId={categoryId} 
          selected={selected} 
          setSelected={setSelected} 
          searchWords={search}
        />
      </div>
      <div className={`item-grid-container ${viewMode} ${viewLoading ? 'loading-overlay' : ''}`}>
            <ChipsBar selected={selected} onRemove={handleRemoveChip} onClearAll={clearAllFilters} />
        {loading ? (
                        viewMode === 'grid'
                            ? <ItemGridSkeleton count={8} />
                            : <ItemStackSkeleton count={3} />
                        
                    ) : (
                        viewMode === 'grid'
                            ? <ItemGrid items={results} props={props} />
                            : <ItemStack items={results} props={props} />
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}
      </div>
    </div>
    </div>
    </>
  );
};

export default SearchPage;
