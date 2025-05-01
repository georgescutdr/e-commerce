import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import './price.css'

export const Price = ({ price, newPrice }) => {
  const dollarIcon = <FontAwesomeIcon icon={ faDollarSign } className="text-green-600" />;

  return (
    <div className="price-container">
      {price === newPrice || !newPrice ? (
        <div className="new-price">
          <sup>{ dollarIcon }</sup> { price }
        </div>
      ) : (
        <div>
          <div className="old-price">
            <s>
              <sup>{ dollarIcon }</sup> { price }
            </s>
          </div>
          <div className="new-price">
            <sup>{ dollarIcon }</sup> { newPrice }
          </div>
        </div>
      )}
    </div> 
  );
};
