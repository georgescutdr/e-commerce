import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Axios from 'axios';
import { shopConfig } from '../../../config';
import { Rating } from 'primereact/rating';
import { capitalize } from '../../../utils';
import { SearchPanelSkeleton } from '../skeleton/search-panel-skeleton';
import './search-panel.css';

export const SearchPanel = ({ categoryId, selected, setSelected, displayOnly=false, searchWords='' }) => {
  const [attributes, setAttributes] = useState({});
  const [options, setOptions] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Parse filters from URL
  useEffect(() => {
    if(displayOnly) return;
    const parsed = {};
    for (const [key, value] of searchParams.entries()) {
      parsed[key] = value.split(',').map((v) => {
        const [id, label] = v.split(':');
        return { id: isNaN(id) ? id : Number(id), label: decodeURIComponent(label) };
      });
    }

    const allKeys = ['minRating', 'priceRange', 'options', 'brands', 'promotions'];
    allKeys.forEach((key) => {
      if (!parsed[key]) parsed[key] = [];
    });

    setSelected(parsed);
  }, [searchParams]);

  // Fetch filter options
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [brandsRes, optionsRes, promotionsRes, attributesRes, priceBoundsRes, minimumRatingRes] = await Promise.all([
          Axios.get(shopConfig.api.getCategoryBrandsUrl, { params: { categoryId } }),
          Axios.get(shopConfig.api.getCategoryOptionsUrl, { params: { categoryId } }),
          Axios.get(shopConfig.api.getCategoryPromotionsUrl, { params: { categoryId } }),
          Axios.get(shopConfig.api.getProductAttributesUrl, { params: { categoryId } }),
          Axios.get(shopConfig.api.getPriceBoundsUrl, { params: { categoryId } }),
          Axios.get(shopConfig.api.countMinimumRatingProductsUrl, { params: { categoryId } }),
        ]);
console.log('SEARCH PANEL: ', minimumRatingRes.data)
        setBrands(brandsRes.data);
        setOptions(optionsRes.data);
        setPromotions(promotionsRes.data);
        setAttributes(attributesRes.data);
        const { minPrice = 0, maxPrice } = priceBoundsRes.data;
        if (maxPrice > minPrice) {
          const step = (maxPrice - minPrice) / 5;
          const ranges = Array.from({ length: 5 }, (_, i) => ({
            label: `${Math.round(minPrice + i * step)} - ${Math.round(minPrice + (i + 1) * step)}`,
            from: Math.round(minPrice + i * step),
            to: Math.round(minPrice + (i + 1) * step),
          }));
          setPriceRanges(ranges);
        }
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

  const toggleCollapse = (attrName) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [attrName]: !prev[attrName],
    }));
  };

  const toggleCheckbox = (attrName, valueId, label = valueId) => {
  if (displayOnly) {
    const params = new URLSearchParams();
    params.set(attrName, `${valueId}:${encodeURIComponent(label)}`);

    const trimmedSearch = searchWords?.trim();
    const basePath = trimmedSearch
      ? `/search/pd/${categoryId}/${encodeURIComponent(trimmedSearch)}`
      : `/search/pd/${categoryId}`;
    const queryString = params.toString();
    const url = queryString ? `${basePath}/?${queryString}` : `${basePath}/`;

    navigate(url, { replace: true });
 
  }

  // Normal interactive mode
  setSelected((prev) => {
    const prevList = prev[attrName] || [];
    const exists = prevList.some((item) => item.id === valueId);
    const newList = exists
      ? prevList.filter((item) => item.id !== valueId)
      : [...prevList, { id: valueId, label }];

    const updated = { ...prev, [attrName]: newList };
    if (newList.length === 0) {
      delete updated[attrName];
    }

    const params = new URLSearchParams();
    Object.entries(updated).forEach(([key, values]) => {
      const encoded = values.map((v) => `${v.id}:${encodeURIComponent(v.label)}`).join(',');
      params.set(key, encoded);
    });

    const trimmedSearch = searchWords?.trim();
    const basePath = trimmedSearch
      ? `/search/pd/${categoryId}/${encodeURIComponent(trimmedSearch)}`
      : `/search/pd/${categoryId}`;
    const queryString = params.toString();
    const url = queryString ? `${basePath}/?${queryString}` : `${basePath}/`;

    navigate(url, { replace: true });

    return updated;
  });
};


  const renderCardFromList = (attrName, list) => (
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
              checked={displayOnly ? false : selected[attrName]?.some((v) => v.id === item.id) || false}
              onChange={() => toggleCheckbox(attrName, item.id, item.display || item.name)}
            />
            {item.display || item.name} <span className="total-rows">({item.total_rows || 0})</span> 
          </label>
        ))}
      </div>
    </div>
  );

  const renderPriceRangeCard = () => {
    const attrName = 'priceRange';

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
                  checked={displayOnly ? false : selected[attrName]?.some((v) => v.id === rangeKey) || false}
                  onChange={() => toggleCheckbox(attrName, rangeKey, range.label)}
                />
                {range.label}
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMinimumRatingCard = () => {
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
                checked={displayOnly ? false : selected[attrName]?.some((v) => v.id === starCount) || false}
                onChange={() => toggleCheckbox(attrName, starCount, `${starCount} stars`)}
              />
              <Rating value={starCount} readOnly cancel={false} stars={5} /> <span className="total-rows">({0})</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  if (loading) return <SearchPanelSkeleton />;

  return (
    <div className="search-panel">
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
                      checked={displayOnly ? false : selected[attrName]?.some((v) => v.id === val.id) || false}
                      onChange={() => toggleCheckbox(attrName, val.id, val.display || val.name)}
                    />
                    {val.display} <span className="total-rows">({val.total_rows || 0})</span> 
                  </label>
                ))}
              </div>
            </div>
          )
      )}
      {options.length > 0 && renderCardFromList('options', options)}
      {brands.length > 0 && renderCardFromList('brands', brands)}
      {priceRanges.length > 0 && renderPriceRangeCard()}
      {promotions.length > 0 && renderCardFromList('promotions', promotions)}
      {renderMinimumRatingCard()}
    </div>
  );
};
