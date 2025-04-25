import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { shopConfig } from '../../../config';
import { Rating } from 'primereact/rating';
import { capitalize } from '../../../utils';
import { SearchPanelSkeleton } from '../skeleton/search-panel-skeleton';
import './search-panel.css';

export const SearchPanel = ({ categoryId }) => {
  const [attributes, setAttributes] = useState({});
  const [options, setOptions] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [selected, setSelected] = useState({});
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all filter-related data
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [brandsRes, optionsRes, promotionsRes, attributesRes, priceBoundsRes] = await Promise.all([
          Axios.get(shopConfig.api.getCategoryBrandsUrl, { params: { categoryId } }),
          Axios.post(shopConfig.getItemsUrl, { table: 'option' }),
          Axios.post(shopConfig.getItemsUrl, { table: 'promotion' }),
          Axios.get(shopConfig.api.getProductAttributesUrl, { params: { categoryId } }),
          Axios.get(shopConfig.api.getPriceBoundsUrl, {params:{categoryId: categoryId }}),
        ]);
console.log('PRICE: ', priceBoundsRes.data)
        setBrands(brandsRes.data);
        processOptions(optionsRes.data);
        processPromotions(promotionsRes.data);
        processAttributes(attributesRes.data);
        processPriceBounds({ minPrice: 0, maxPrice: priceBoundsRes.data.maxPrice });
      } catch (err) {
        console.error('Error fetching filter data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchFilterData();
    } else {
      setLoading(false);
    }
  }, [categoryId]);

  const processOptions = (data) => setOptions(data);
  const processPromotions = (data) => setPromotions(data);
  const processAttributes = (data) => setAttributes(data);
  const processPriceBounds = ({ minPrice, maxPrice }) => {
    if (minPrice !== undefined && maxPrice !== undefined && maxPrice > minPrice) {
      const step = (maxPrice - minPrice) / 5;
      const steps = Array.from({ length: 5 }, (_, i) => ({
        label: `${Math.round(minPrice + i * step)} - ${Math.round(minPrice + (i + 1) * step)}`,
        from: Math.round(minPrice + i * step),
        to: Math.round(minPrice + (i + 1) * step),
      }));
      setPriceRanges(steps);
    }
  };

  const toggleCheckbox = (attrName, valueId) => {
    setSelected((prev) => {
      const prevSet = new Set(prev[attrName] || []);
      prevSet.has(valueId) ? prevSet.delete(valueId) : prevSet.add(valueId);
      return { ...prev, [attrName]: Array.from(prevSet) };
    });
  };

  const toggleCollapse = (attrName) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [attrName]: !prev[attrName],
    }));
  };

  const minimumRatingCard = () => {
    const attrName = 'minRating';

    return (
      <div className="attribute-card">
        <div className="attribute-card-header" onClick={() => toggleCollapse(attrName)}>
          <h4 className="attribute-name">Minimum Rating</h4>
          <span className={`collapse-toggle ${collapsedGroups[attrName] ? 'collapsed' : ''}`}>
            {collapsedGroups[attrName] ? '▼' : '▲'}
          </span>
        </div>
        <div className={`attribute-group ${collapsedGroups[attrName] ? 'collapsed' : ''}`}>
          {[5, 4, 3, 2, 1].map((starCount) => (
            <label key={starCount} className="checkbox-label">
              <input
                type="checkbox"
                checked={selected[attrName]?.includes(starCount) || false}
                onChange={() => toggleCheckbox(attrName, starCount)}
              />
              <Rating value={starCount} readOnly cancel={false} stars={5} />
            </label>
          ))}
        </div>
      </div>
    );
  };

  const priceRangeCard = () => {
    const attrName = 'priceRange';

    const handleCheckboxChange = (range) => {
      const rangeKey = `${range.from}-${range.to}`;
      toggleCheckbox(attrName, rangeKey);
    };

    return (
      <div className="attribute-card">
        <div className="attribute-card-header" onClick={() => toggleCollapse(attrName)}>
          <h4 className="attribute-name">Price Range</h4>
          <span className={`collapse-toggle ${collapsedGroups[attrName] ? 'collapsed' : ''}`}>
            {collapsedGroups[attrName] ? '▼' : '▲'}
          </span>
        </div>
        <div className={`attribute-group ${collapsedGroups[attrName] ? 'collapsed' : ''}`}>
          {priceRanges.map((range, idx) => {
            const rangeKey = `${range.from}-${range.to}`;
            return (
              <label key={idx} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selected[attrName]?.includes(rangeKey) || false}
                  onChange={() => handleCheckboxChange(range)}
                />
                {range.label}
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  const cardFromList = (attrName, list) => (
    <div className="attribute-card">
      <div className="attribute-card-header" onClick={() => toggleCollapse(attrName)}>
        <h4 className="attribute-name">{capitalize(attrName)}</h4>
        <span className={`collapse-toggle ${collapsedGroups[attrName] ? 'collapsed' : ''}`}>
          {collapsedGroups[attrName] ? '▼' : '▲'}
        </span>
      </div>
      <div className={`attribute-group ${collapsedGroups[attrName] ? 'collapsed' : ''}`}>
        {list.map((item) => (
          <label key={item.id} className="checkbox-label">
            <input
              type="checkbox"
              checked={selected[attrName]?.includes(item.id) || false}
              onChange={() => toggleCheckbox(attrName, item.id)}
            />
            {item.display || item.name}
          </label>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <SearchPanelSkeleton />;
  }

  return (
    <div className="search-panel">
      <h3 className="search-panel-title">Filter by Attributes</h3>

      {Object.entries(attributes).map(
        ([attrName, values]) =>
          values.length > 0 && (
            <div key={attrName} className="attribute-card">
              <div className="attribute-card-header" onClick={() => toggleCollapse(attrName)}>
                <h4 className="attribute-name">{capitalize(attrName)}</h4>
                <span className={`collapse-toggle ${collapsedGroups[attrName] ? 'collapsed' : ''}`}>
                  {collapsedGroups[attrName] ? '▼' : '▲'}
                </span>
              </div>
              <div className={`attribute-group ${collapsedGroups[attrName] ? 'collapsed' : ''}`}>
                {values.map((val) => (
                  <label key={val.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selected[attrName]?.includes(val.id) || false}
                      onChange={() => toggleCheckbox(attrName, val.id)}
                    />
                    {val.display}
                  </label>
                ))}
              </div>
            </div>
          )
      )}

      {options.length > 0 && cardFromList('options', options)}
      {brands.length > 0 && cardFromList('brands', brands)}
      {priceRanges.length > 0 && priceRangeCard()}
      {promotions.length > 0 && cardFromList('promotions', promotions)}
      {minimumRatingCard()}
    </div>
  );
};
