import React, { useContext } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { slugify } from '../../../../../../utils'
import { ShopContext } from '../../../../../context/shop-context';
import './product-card.css';

export const ProductCard = ({ item, onRemove }) => {
    if (!item) return null;

    const {removeFromCart} = useContext(ShopContext);

    const image = item.image
        ? `/public/uploads/product/${item.id}/${item.image}`
        : `/public/uploads/product/default/${item.category_id}/default-image.jpg`;

    return (
        <div className="dropdown-product-card">
            <img className="product-image" src={image} alt={item.name} />
            <div className="product-info">
                <Link to={`/${slugify(item.brand_name + ' ' + item.name)}/pd/${item.product_code}`} className="product-title-link">
                    <span className="product-title">{`${item.brand_name} ${item.name}`}</span>
                </Link>
                <span className="product-price">${Number(item.price).toFixed(2)}</span>
            </div>
            <div className="product-meta">
                <span className="product-quantity">Qty: {item.quantity}</span>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    <FiTrash2 />
                </button>
            </div>
        </div>
    );
};
