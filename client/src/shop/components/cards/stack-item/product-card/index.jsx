import React from 'react';
import { Rating } from '../../../rating';
import { Button } from 'primereact/button';
import { AddToCartButton } from '../../../add-to-cart-button';
import { AddToWishlistButton } from '../../../add-to-wishlist-button';
import { Link } from 'react-router-dom';
import { VoucherLabel } from '../../../voucher-label';
import { Attributes } from '../../../attributes';
import { StockStatus } from '../../../stock-status';
import { Price } from '../../../price';
import { applyPromotions, getAverageRating, getPromotionLabel, makeItemUrl, makeItemTitle } from '../../../../../utils';
import { getUser, isLoggedIn } from '../../../../../utils/auth-helpers';
import './product-card.css';

export const ProductCard = ({ item, table, onRemove }) => {
   
   const user = getUser();

    return (
        <div className="stack-card">
            <div className="stack-card-image">
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
            <div className="stack-card-details">
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
                <div className="stack-rating">
                    <Rating value={item.rating} ratingCount={item.rating_count} />
                </div>
                {item.attribute_array?.[0]?.name && (
                    <div className="product-attributes">
                         <Attributes items={item.attribute_array} small={true} /> 
                    </div>
                )}
            </div>
            <div className="stack-card-actions">
                    <div className="add-to-wishlish-btn">
                        <AddToWishlistButton item={item} iconOnly={true} userId={user?.id} />
                    </div>
                <div className="stock-status">
                      <StockStatus quantity={item.quantity} />
                </div>
                {item.voucher_array?.[0]?.id && (
                    <div className="voucher-label">
                        <VoucherLabel vouchers={item.voucher_array} />
                    </div>
                )}
                <Price
                    newPrice={
                        item.promotion_array?.[0]
                          ? applyPromotions(item.promotion_array, item.price)
                          : 0
                    }
                    price={item.price}
                />
                <AddToCartButton item={item} props={{ label: false }} />
            </div>
        </div>
    );
};

export default ProductCard;
