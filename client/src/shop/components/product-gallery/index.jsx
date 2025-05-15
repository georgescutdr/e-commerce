import React, { useState } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import './product-gallery.css';

export const ProductGallery = ({ images = [], productId, categoryId }) => {
  const isValidArray = Array.isArray(images) && images.length > 0 && images[0] !== null;

  

  const fallbackImages = [
    {id: 1, image_name: `/uploads/product/default/${categoryId}/1.jpg`},
    {id: 2, image_name: `/uploads/product/default/${categoryId}/2.jpg`},
    {id: 3, image_name: `/uploads/product/default/${categoryId}/3.jpg`},
  ];

  const uniqueImages = isValidArray
    ? Array.from(new Map(images.map((img) => [img.id, img])).values())
    : fallbackImages;

  const getImageUrl = (image) => {
    if (image.id === 'default') {
      return `/uploads/product/default/default.png`;
    }
    return `${image.image_name}`;
  };

  const [selectedImage, setSelectedImage] = useState(uniqueImages[0]);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsLoading(true);
  };

  return (
    <div className="product-gallery-wrapper">
      <div className="thumbnail-column">
        {uniqueImages.map((image) => (
          <div
            key={image.id}
            className={`thumbnail-item ${
              selectedImage.id === image.id ? 'active' : ''
            }`}
            onClick={() => handleImageClick(image)}
          >
            <img
              src={getImageUrl(image)}
              alt={image.image_name}
              className="thumbnail"
            />
          </div>
        ))}
      </div>

      <div className="image-preview">
        {isLoading && (
          <div className="loader">
            <ProgressSpinner style={{ width: '40px', height: '40px' }} strokeWidth="4" />
          </div>
        )}
        <img
          src={getImageUrl(selectedImage)}
          alt={selectedImage.image_name}
          className="main-image"
          onLoad={() => setIsLoading(false)}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
      </div>
    </div>
  );
};
