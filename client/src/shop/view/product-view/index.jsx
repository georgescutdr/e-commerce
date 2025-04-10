import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';
import { Rating } from 'primereact/rating';
import { useParams } from 'react-router-dom';
import { AddToCartButton } from '../components/add-to-cart-button';
import { AddToFavouritesButton } from '../components/add-to-favourites-button';
import { Price } from '../components/price';
import { Reviews } from '../components/reviews';
import { StockStatus } from '../components/stock-status'
import { Attributes } from '../components/attributes'
import { Options } from '../components/options'
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './product-view.css';

export const ProductView = ({item}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reviews, setReviews] = useState(0);
  const params = useParams();

  const images = item.files?.map(
    (file) => `/public/uploads/${item.table}/${item.id}/${file.file_name}`
  ) || ['/public/uploads/default-image.jpg'];

  const galleriaItem = (item) => (
    <img
      src={item}
      alt="Product"
      className="main-image"
    />
  );

  const thumbnailTemplate = (item) => (
    <img
      src={item}
      alt="Thumbnail"
      className="thumbnail-image"
    />
  );

  const title = `${item.brand[0].name} ${item.category[0].single_name} ${item.name}`

  return (
    <div className="product-page">
  <h1 className="product-title">{ title }</h1>

  <div className="product-columns">
    {/* Left: Image Gallery */}
    <div className="product-gallery">
      <Galleria
        value={images}
        activeIndex={activeIndex}
        onItemChange={(e) => setActiveIndex(e.index)}
        item={galleriaItem}
        thumbnail={thumbnailTemplate}
        thumbnailsPosition="bottom"
        numVisible={4}
        circular
        style={{ maxWidth: '100%' }}
      />
    </div>

    {/* Middle: Description + Rating */}
    <div className="product-description">
      <div className="product-rating">
        <Rating value={item.rating} readOnly cancel={false} stars={5} />
        <span className="rating-text">{item.rating}</span>
      </div>
      <p>{item.description}</p>
      <div className="product-options">
      	<Options items={ item.option } />
      </div>
    </div>

    {/* Right: Price + Add to Cart */}
    <div className="product-side-info">
      <div className="product-price">
        <Price price={item.price} newPrice={300} />
      </div>
      <StockStatus quantity={ item.quantity } />
      <AddToCartButton item={ item } />
      <AddToFavouritesButton item={ item } />
    </div>
  </div>
  <div className="product-attributes">
  	<Attributes items={ item.attribute_value } />
  </div>
  <div className="product-reviews">
  	<Reviews itemId={ item.id } />
  </div>
</div>
  );
};
