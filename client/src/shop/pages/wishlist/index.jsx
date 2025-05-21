import React, { useEffect, useState, useRef } from 'react';
import Axios from 'axios';
import { shopConfig } from '../../../config';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { ProductCard } from '../../components/cards/wishlist/product-card';
import { useWishlist } from '../../context/wishlist-context';
import { getUser, isLoggedIn } from '../../../utils/auth-helpers';
import { Header } from '../../components/header';
import './wishlist.css';

const Wishlist = ({ props }) => {
    const user = getUser();
    const isUserLoggedIn = isLoggedIn();
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);

    const {
        wishlistArray,
        loadWishlist,
        toggleWishlist
    } = useWishlist();

    useEffect(() => {
        const fetchWishlist = async () => {
            if (isUserLoggedIn && user?.id) {
                try {
                    const res = await Axios.get(shopConfig.api.getWishlistUrl, {
                        params: { userId: user.id }
                    });
                    loadWishlist(res.data || []);
                } catch (err) {
                    console.error('Error fetching wishlist from DB:', err);
                }
            }
            // Guest case: just rely on localStorage/context data (already loaded)
            setLoading(false);
        };

        fetchWishlist();
    }, []);

    const handleRemove = async (productId) => {
        const productToRemove = wishlistArray.find(item => item.id === productId);
        if (!productToRemove) return;

        // Always remove from context
        toggleWishlist(productToRemove);

        if (isUserLoggedIn && user?.id) {
            try {
                await Axios.post(shopConfig.api.wishlistToggleUrl, {
                    userId: user.id,
                    productId
                });

                toast.current?.show({
                    severity: 'warn',
                    summary: 'Removed',
                    detail: 'Item removed from wishlist',
                    life: 3000,
                });
            } catch (error) {
                console.error('Error removing from DB:', error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to update wishlist on server',
                    life: 3000,
                });
            }
        } else {
            // Guest: Just show local confirmation
            toast.current?.show({
                severity: 'warn',
                summary: 'Removed',
                detail: 'Item removed from guest wishlist',
                life: 3000,
            });
        }
    };

    return (
        <>
        <Header />
        <div className="wishlist-container">
            <Toast ref={toast} />
            <h2>
              Your Wishlist{' '}
              <span className="wishlist-count">
                {wishlistArray.length} product{wishlistArray.length !== 1 ? 's' : ''}
              </span>
            </h2>
            {loading ? (
                <div className="wishlist-loader">
                    <ProgressSpinner />
                </div>
            ) : (
                <div className="wishlist-cards-container">
                    {wishlistArray.length === 0 ? (
                        <p className="empty-message">Your wishlist is empty.</p>
                    ) : (
                        wishlistArray.map((item) => (
                            <ProductCard
                                key={item.id}
                                item={item}
                                onRemove={() => handleRemove(item.id)}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
        </>
    );
};

export default Wishlist;
