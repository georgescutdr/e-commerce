import React from 'react';
import './search-panel-skeleton.css';

export const SearchPanelSkeleton = () => {
  return (
    <div className="search-panel">
      <h3 className="search-panel-title">Filter by Attributes</h3>
      {[1, 2, 3, 4].map((_, index) => (
        <div key={index} className="attribute-card skeleton-card">
          <div className="attribute-card-header">
            <div className="skeleton skeleton-title" />
          </div>
          <div className="attribute-group">
            {[1, 2, 3].map(i => (
              <div key={i} className="skeleton skeleton-checkbox" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
