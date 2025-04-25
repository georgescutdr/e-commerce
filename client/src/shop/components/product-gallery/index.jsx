import React from 'react';
import { Galleria } from 'primereact/galleria';
import './product-gallery.css';

export const ProductGallery = ({ images = [], productId }) => {
  const isValidArray = Array.isArray(images) && images.length > 0 && images[0] !== null;

  // Fallback default image
  const defaultImage = {
    id: 'default',
    image_name: 'default.png', // This should exist in `/public/uploads/default.png`
  };

  const fallbackImages = [defaultImage];

  // Remove duplicates based on `id`
  const uniqueImages = isValidArray
    ? Array.from(new Map(images.map((img) => [img.id, img])).values())
    : fallbackImages;

  const getImageUrl = (image) => {
    if (image.id === 'default') {
      return `/public/uploads/default-image.jpg`;
    }
    return `/public/uploads/product/${productId}/${image.image_name}`;
  };

  const itemTemplate = (item) => (
    <img
      src={getImageUrl(item)}
      alt={item.image_name}
      className="product-main-image"
      style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
    />
  );

  const thumbnailTemplate = (item) => (
    <img
      src={getImageUrl(item)}
      alt={item.image_name}
      className="product-thumbnail"
      style={{ width: 60, height: 60, objectFit: 'cover' }}
    />
  );

  return (
    <div className="product-gallery-wrapper">
      <Galleria
        value={uniqueImages}
        numVisible={5}
        circular
        showThumbnails
        showIndicators={false}
        showItemNavigators
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
        style={{ margin: '0 auto' }}
      />
    </div>
  );
};
