// src/pages/SearchPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { shopConfig } from '../../../config';
import './search-page.css';

const SearchPage = () => {
    const { search } = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!search || search.trim() === '') {
            setError('Search query is empty.');
            return;
        }

        const fetchSearchResults = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await Axios.get(shopConfig.searchApiUrl, {
                    params: { search: search.trim() },
                });

                const data = res?.data;
                setResults(Array.isArray(data.products) ? data.products : []);
            } catch (err) {
                console.error('Search error:', err);
                setError('Failed to fetch search results. Please try again later.');
          } finally {
                setLoading(false);
          }
        };

        fetchSearchResults();
    }, [search]);

    return (
        <div className="search-page">
            <h2>
                Search Results for: <span className="highlight">{search}</span>
            </h2>

              {loading && <p>Loading...</p>}

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Retry</button>
                </div>
            )}

            {!loading && !error && results.length === 0 && (
                <p>No results found.</p>
            )}

            {!loading && !error && results.length > 0 && (
                <ul className="results-list">
                    {results.map((item, index) => (
                        <li key={item.id || index}>
                            {item.name || <em>Unnamed Item</em>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchPage;
