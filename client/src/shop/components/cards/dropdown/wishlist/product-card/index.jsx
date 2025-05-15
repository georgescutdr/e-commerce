import React, { useContext, useRef } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { slugify } from '../../../../../../utils';
import { WishlistContext } from '../../../../../context/wishlist-context';
import Axios from 'axios';
import { shopConfig } from '../../../../../../config';
import { Toast } from 'primereact/toast';
import { getUser, isLoggedIn } from '../../../../../../utils/auth-helpers';
import './product-card.css';

export const ProductCard = ({ item }) => {
    const { toggleWishlist } = useContext(WishlistContext);
    const toast = useRef(null);
    const user = getUser();

    if (!item) return null;

    const image = item.image
        ? `/public/uploads/product/${item.id}/${item.image}`
        : `/public/uploads/product/default/${item.category_id}/default-image.jpg`;

    const handleRemove = () => {
        // Update context
        toggleWishlist(item);

        // Call API to update DB
        Axios.post(shopConfig.api.wishlistToggleUrl, {
            userId: user?.id, 
            productId: item.id,
        })
        .then((res) => {
            const msg = res.data.message;
            if (toast.current) {
                toast.current.show({
                    severity: msg.includes('removed') ? 'warn' : 'success',
                    summary: 'Wishlist Updated',
                    detail: msg,
                    life: 3000,
                });
            }
        })
        .catch(() => {
            if (toast.current) {
                toast.current.show({
                    severity: 'error',
                    summary: 'Wishlist Error',
                    detail: 'Failed to update wishlist',
                    life: 3000,
                });
            }
        });
    };

    return (
        <div className="dropdown-product-card">
            <Toast ref={toast} />
            <img className="product-image" src={image} alt={item.name} />
            <div className="product-info">
                <Link
                    to={`/${slugify(item.brand_name + ' ' + item.name)}/pd/${item.product_code}`}
                    className="product-title-link"
                >
                    <span className="product-title">{`${item.brand_name} ${item.name}`}</span>
                </Link>
            </div>
            <div className="product-meta">
                <button className="remove-btn" onClick={handleRemove}>
                    <FiTrash2 />
                </button>
            </div>
        </div>
    );
};
