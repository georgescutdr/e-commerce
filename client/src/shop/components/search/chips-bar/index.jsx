import React from 'react';
import { Chip } from 'primereact/chip';
import { capitalize } from '../../../../utils';
import './chips-bar.css';

export const ChipsBar = ({ selected, onRemove, onClearAll }) => {
  const hasFilters = Object.keys(selected).length > 0;

  if (!hasFilters) return null; // Do not render anything if no filters are selected

  return (
    <div className="chips-bar">
      <div className="chips-container">
        {Object.entries(selected).flatMap(([attrName, values]) =>
          values.map((val) => (
            <Chip
              key={`${attrName}-${val.id}`}
              label={`${val.label}`}
              removable
              onRemove={() => onRemove(attrName, val.label)}
              className="filter-chip"
            />
          ))
        )}
      </div>

      <button className="clear-filters-btn" onClick={onClearAll}>
        Clear All
      </button>
    </div>
  );
};
