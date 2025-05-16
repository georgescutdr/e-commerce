import React from 'react';
import { Rating } from '../../../rating';
import { Button } from 'primereact/button';
import { AddToCartButton } from '../../../add-to-cart-button';
import { Link } from 'react-router-dom';
import { VoucherLabel } from '../../../voucher-label';
import { StockStatus } from '../../../stock-status';
import { Price } from '../../../price';
import { applyPromotions, getAverageRating, getPromotionLabel, makeItemUrl, makeItemTitle } from '../../../../../utils';
import './product-card.css';

export const ProductCard = ({ item, table, onRemove }) => {
    console.log(item)
    return (
        <div className="wishlist-card">
            <div className="wishlist-card-image">
                <Link to={`/${item.name}/pd/${item.product_code}`}>
                    <img 
                        src={
                            item.files && item.files.length > 0
                                ? `/public/uploads/product/${item.id}/${item.files[0].file_name}`
                                : `/public/uploads/product/default/${item.category_id}/default-image.jpg`
                        } 
                        alt={item.name} 
                    />
                </Link>
            </div>
            <div className="wishlist-card-details">
                {item.promotion_array?.[0]?.id && (
                    <div className="promotion-label">
                        {getPromotionLabel(item.promotion_array)}
                    </div>
                )}
                <div className="product-title">
                    <Link to={`/${item.name}/pd/${item.product_code}`}>
                        <span className="product-title-link">{`${item.brand_name || ''} ${item.name}`}</span>
                    </Link>
                </div>
                <div className="wishlist-rating">
                    <Rating
                      value={item.rating}
                      ratingCount={item.rating_count}
                    />
                </div>
                {item.promotion_array?.[0]?.id > 0 && (
                    <div className="promotions">
                        <strong>
                            <i className="pi pi-tag" style={{ marginRight: '8px' }}></i>
                                Promotions:
                        </strong>
                        <ul>
                        {item.promotion_array.map(promo => (
                            <li key={promo.id} className="promotion-item">
                                  {promo.name} (-{promo.type === 'percentage' ? `${promo.value}%` : `$${promo.value}`})
                            </li>
                        ))}
                        </ul>
                    </div>
                )}
                
                {item.voucher_array?.[0]?.id && (
                    <div className="voucher-label">
                        <VoucherLabel vouchers={item.voucher_array} />
                    </div>
                )}
            </div>
            <div className="wishlist-card-actions">
            <div className="stock-status">
                      <StockStatus quantity={item.quantity} />
                </div>
                <Price
                    newPrice={
                        item.promotion_array?.[0]
                          ? applyPromotions(item.promotion_array, item.price)
                          : 0
                    }
                    price={item.price}
                />
                <AddToCartButton item={item} props={{ label: false }} />
                <Button
                    icon="pi pi-trash"
                    className="p-button-sm p-button-text p-button-danger mt-2 remove-btn"
                    label="Remove"
                    onClick={() => onRemove(item.id)}
                />
            </div>
        </div>
    );
};

export default ProductCard;
