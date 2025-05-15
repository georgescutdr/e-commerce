import React from 'react';
import { capitalize } from '../../../utils'
import './attributes.css';

export const Attributes = ({ items = [], small = false }) => {
  const displayedAttributes = items.slice(0, 10);
  const firstColumn = displayedAttributes.slice(0, 5);
  const secondColumn = displayedAttributes.slice(5, 10);

  if (small) {
    return (
      <div className="attribute-list-wrapper two-columns">
        <ul className="attribute-list">
          {firstColumn.map((attr, index) => (
            <li key={index} className="attribute-item">
              <span className="attribute-name-small">{attr.name}:</span> {attr.value} {attr.unit || ''}
            </li>
          ))}
        </ul>
        <ul className="attribute-list">
          {secondColumn.map((attr, index) => (
            <li key={index} className="attribute-item">
              <span className="attribute-name-small">{attr.name}:</span> {attr.value} {attr.unit || ''}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <table className="attributes-table">
      <tbody>
        {items.map((attr, index) => (
          <tr key={index}>
            <td className="attribute-name">{capitalize(attr.name)}</td>
            <td className="attribute-value">
              {attr.value} {attr.unit || ''}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
