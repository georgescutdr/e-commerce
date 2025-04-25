import React from 'react';
import './item-grid.css';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { PrimeIcons } from 'primereact/api';
import { AddToCartButton } from '../add-to-cart-button';
import { StockStatus } from '../stock-status';
import { VoucherLabel } from '../voucher-label';
import { Price } from '../price';
import { applyPromotions, getAverageRating, getPromotionLabel, makeItemUrl, makeItemTitle} from '../../../utils';

export const ItemGrid = ({ items, props }) => {
    const params = useParams();
console.log(items)
    let table;
    switch (props.table) {
        case 'category':
            table = 'product';
            break;
        case 'product':
            table = 'view_product';
            break;
        default:
            table = props.table;
    }

    return (
        <>
            {Array.isArray(items) && items.length > 0 ? (
                <div className="grid-container">
                    {items.map((item) => (
                        <div className="grid-item" key={item.id}>
                            <Link
                                key={props.table + item.id}
                                to={`/${makeItemUrl(item)}/pd/${item.id}/${table}`}
                                className="grid-item"
                            >
                                <img
                                    src={
                                        item.files && item.files.length > 0
                                            ? `/public/uploads/${props.table}/${item.id}/${item.files[0].file_name}`
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
                                <div className="grid-content">
                                    <h3 className="item-title">
                                        {makeItemTitle(item)}
                                    </h3>
                                    {/* Rating Stars */}
                                    <div className="product-rating">
                                        <Rating
                                            value={getAverageRating(item.review_array)}
                                            readOnly
                                            cancel={ false }
                                            stars={ 5 }
                                            className="mb-2"
                                        />
                                    </div>
                                        <div className="stock-status">
                                            <StockStatus quantity={item.quantity} />
                                        </div>
                                        <div className="voucher-label">
                                            <VoucherLabel vouchers={item.voucher_array} />
                                        </div>
                                        <Price
                                            newPrice={
                                                item.promotion_array?.[0]
                                                    ? applyPromotions(item.promotion_array, item.price)
                                                    : 0
                                            }
                                            price={item.price}
                                        />
                                        <AddToCartButton item={item} />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-items-container">
                    <p className="no-items">No items found! Try another category.</p>
                </div>
            )}
        </>
    );
};
