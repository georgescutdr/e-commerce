import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';
import { Rating } from 'primereact/rating';
import { useParams } from 'react-router-dom';
import { AddToCartButton } from '../../components/add-to-cart-button';
import { AddToWishlistButton } from '../../components/add-to-wishlist-button';
import { Price } from '../../components/price';
import { Reviews } from '../../components/reviews';
import { StockStatus } from '../../components/stock-status'
import { Attributes } from '../../components/attributes'
import { Options } from '../../components/options'
import { ProductGallery } from '../../components/product-gallery'
import { PromotionsList } from '../../components/promotions-list'
import { VoucherLabel } from '../../components/voucher-label'
import { makeItemTitle, getAverageRating, applyPromotions } from '../../../utils'
import { getUser, isLoggedIn } from '../../../utils/auth-helpers';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './product-view.css';

export const ProductView = ({ item, props }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [reviews, setReviews] = useState(0);
    const params = useParams();

    const title = makeItemTitle(item);
    const user = getUser();

    return (
        <div className="product-page">
            <h1 className="product-title">{title}</h1>

            <div className="product-columns">
                {/* Left: Image Gallery */}
                <div className="product-gallery">
                    <ProductGallery images={item.image_array} productId={item.id} />
                </div>

                {/* Middle: Description + Rating */}
                <div className="product-description">
                    <div className="product-rating">
                        <Rating value={getAverageRating(item.review_array)} readOnly cancel={false} stars={5} />
                        <span className="rating-text">{item.rating}</span>
                    </div>
                    <p>{item.description}</p>
                    <div className="product-options">
                        <Options items={item.option} />
                    </div>
                </div>

                {/* Right: Price + Add to Cart */}
                <div className="product-side-info">
                    <div className="product-price">
                        <Price
                            newPrice={
                                item.promotion_array?.[0]
                                    ? applyPromotions(item.promotion_array, item.price)
                                    : 0
                            }
                            price={item.price}
                        />
                    </div>
                    <StockStatus quantity={item.quantity} />
                    <PromotionsList promotions={item.promotion_array} />
                    <VoucherLabel vouchers={item.voucher_array} />
                    <AddToCartButton item={item} className="add-to-cart-btn" />
                    {isLoggedIn() && (<AddToWishlistButton item={item} userId={user.id} />)}
                </div>
            </div>

            <div className="product-attributes">
                <Attributes item={item} />
            </div>
            <div className="product-reviews">
                <Reviews itemId={item.id} />
            </div>
        </div>
    );
};
