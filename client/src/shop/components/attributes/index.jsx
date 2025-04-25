import React, { useEffect, useState } from 'react';
import { capitalize } from '../../../utils';
import { shopConfig } from '../../../config';
import Axios from 'axios';
import './attributes.css';

export const Attributes = ({ item }) => {
  const [attributes, setAttributes] = useState({});

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const res = await Axios.get(shopConfig.api.getProductAttributesUrl, {
          params: { productId: item.id }
        });
        // Filter out invalid values
        const filtered = {};
        for (const [key, values] of Object.entries(res.data)) {
          const validValues = values.filter(v => v.value !== undefined && v.value !== null);
          if (validValues.length > 0) {
            filtered[key] = validValues;
          }
        }
        setAttributes(filtered);
      } catch (err) {
        console.error('Failed to fetch product attributes:', err);
      }
    };

    if (item.id) {
      fetchAttributes();
    }
  }, [item]);

  return (
    <div className="attributes-style">
      <h4 className="attributes-title">Product Features</h4>
      {Object.keys(attributes).length === 0 ? (
        <p className="attributes-empty">No attributes available</p>
      ) : (
        <table className="attributes-table">
          <tbody>
            {Object.entries(attributes).map(([attrName, values]) => (
              <tr key={attrName}>
                <td className="attribute-name">{capitalize(attrName)}</td>
                <td className="attribute-value">
                  {values.map(v => v.display).join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
