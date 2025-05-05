// src/components/item-grid/GridItemProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from 'primereact/rating';
import { AddToCartButton } from '../../../add-to-cart-button';
import { AddToWishlistButton } from '../../../add-to-wishlist-button';
import { StockStatus } from '../../../stock-status';
import { VoucherLabel } from '../../../voucher-label';
import { Price } from '../../../price';
import { applyPromotions, getAverageRating, getPromotionLabel, makeItemUrl, makeItemTitle } from '../../../../../utils';
import './product-card.css';

export const ProductCard = ({ item, table }) => {
 
    return (
        <div className="grid-item">
            <AddToWishlistButton item={item} iconOnly={true} userId={1} />
            <Link
                to={`/${makeItemUrl(item)}/pd/${item.id}/${table}`}
                className="grid-item-link"
            >
                <img
                    src={
                        item.files?.[0]
                            ? `/public/uploads/${table}/${item.id}/${item.files[0].file_name}`
                            : '/public/uploads/default-image.jpg'
                    }
                    alt={item.name}
                    className="item-image"
                />
                {item.promotion_array?.[0] && (
                    <div className="promotion-label">
                        {getPromotionLabel(item.promotion_array)}
                    </div>
                )}
                </Link>
                <div className="grid-item-content">
                <Link
                    to={`/${makeItemUrl(item)}/pd/${item.id}/${table}`}
                    className="grid-item-link"
                >
                  <h3 className="item-title">{makeItemTitle(item)}</h3>
                </Link>
                  <div className="product-rating">
                    <Rating
                      value={item.rating || getAverageRating(item.review_array)}
                      readOnly
                      cancel={false}
                      stars={5}
                      className="mb-2"
                    />
                  </div>
                  <div className="stock-status">
                      <StockStatus quantity={item.quantity} />
                  </div>
                  <div className="voucher-label">
                        {item.voucher_array?.[0]?.id && <VoucherLabel vouchers={item.voucher_array} />}
                 </div>
                  <div className="card-bottom">
                    <Price
                      newPrice={
                        item.promotion_array?.[0]
                          ? applyPromotions(item.promotion_array, item.price)
                          : undefined
                      }
                      price={item.price}
                    />
                    <AddToCartButton item={item} className="add-to-cart-btn" />
                  </div>
                </div>

            
        </div>
    );
};
