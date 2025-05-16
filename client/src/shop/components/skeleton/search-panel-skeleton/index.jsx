import React from 'react';
import './search-panel-skeleton.css';

export const SearchPanelSkeleton = () => {
  return (
    <div className="search-panel">
      {[1, 2, 3, 4].map((_, index) => (
        <div key={index} className="attribute-card skeleton-card">
          <div className="attribute-card-header skeleton">
            <div className="skeleton-title" />
          </div>
        </div>
      ))}
    </div>
  );
};
