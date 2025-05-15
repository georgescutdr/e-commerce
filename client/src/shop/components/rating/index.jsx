import React from 'react';
import { Rating as PrimeRating } from 'primereact/rating';
import './rating.css';

export const Rating = ({ value, ratingCount }) => {
  return (
    <div className="custom-rating">
      <PrimeRating 
        value={value} 
        readOnly 
        cancel={false} 
        stars={5}
      />
      <span className="rating-value">
		  {value != null && !isNaN(value) ? Number(value).toFixed(1) : '0.0'}
		</span>
      {ratingCount != null && ratingCount > 0 && (
        <span className="rating-count">({ratingCount})</span>
      )}
    </div>
  );
};

export default Rating;
