import React, { useEffect, useState, useRef } from 'react';
import Axios from 'axios';
import { shopConfig } from '../../../config';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { ProductCard } from '../../components/cards/wishlist/product-card';
import { useWishlist } from '../../context/wishlist-context';
import { getUser, isLoggedIn } from '../../../utils/auth-helpers';
import './wishlist.css';

const Wishlist = ({ props }) => {
    const user = getUser();
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);

    const {
        wishlistArray,
        loadWishlist,
        toggleWishlist
    } = useWishlist();

    useEffect(() => {
        Axios.get(shopConfig.api.getWishlistUrl, {
            params: { userId: user?.id }
        })
            .then((res) => {
                const wishlist = res.data || [];
                loadWishlist(wishlist); // sync with context
            })
            .catch((err) => {
                console.error('Error fetching wishlist from DB:', err);
            })
            .finally(() => setLoading(false));
    }, [props, loadWishlist]);

    const handleRemove = async (productId) => {
        try {
            await Axios.post(shopConfig.api.wishlistToggleUrl, {
                userId: user?.id,
                productId,
            });

            const productToRemove = wishlistArray.find(item => item.id === productId);
            if (productToRemove) {
                toggleWishlist(productToRemove); // remove from context
            }

            toast.current?.show({
                severity: 'success',
                summary: 'Removed',
                detail: 'Item removed from wishlist',
                life: 3000,
            });
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to remove item',
                life: 3000,
            });
        }
    };

    return (
        <div className="wishlist-container">
            <Toast ref={toast} />
            <h2>Your Wishlist</h2>
            <Card className="wishlist-info-card">
                {wishlistArray.length > 0 ? (
                    <p className="wishlist-info-text">
                        {wishlistArray.length} product{wishlistArray.length > 1 ? 's' : ''} in your wishlist
                    </p>
                ) : (
                    <p className="wishlist-info-text">Your wishlist is empty.</p>
                )}
            </Card>

            {loading ? (
                <div className="wishlist-loader">
                    <ProgressSpinner />
                </div>
            ) : (
                <div className="wishlist-cards-container">
                    {wishlistArray.map((item) => (
                        <ProductCard
                            key={item.id}
                            item={item}
                            table={props.table}
                            onRemove={handleRemove}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
