import React, { useRef, useState, useEffect } from 'react';
import './add-to-wishlist-button.css';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import Axios from 'axios';
import { shopConfig } from '../../../config.js';
import { useWishlist } from '../../context/wishlist-context';

export const AddToWishlistButton = ({ item, userId, iconOnly = false }) => {
    const toast = useRef(null);
    const [loading, setLoading] = useState(false);
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [localInWishlist, setLocalInWishlist] = useState(isInWishlist(item.id));

    // Keep local state in sync when item or global state changes
    useEffect(() => {
        setLocalInWishlist(isInWishlist(item.id));
    }, [item.id, isInWishlist]);

    const handleWishListToggle = () => {
        if (loading) return;
        setLoading(true);

        // Optimistic toggle in local UI
        setLocalInWishlist(prev => !prev);
        toggleWishlist(item);

        // Sync with backend
        Axios.post(shopConfig.api.wishlistToggleUrl, {
            userId,
            productId: item.id,
        })
        .then((res) => {
            if (res.data.message.includes('added')) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Wishlist Updated',
                    detail: 'Item added to wishlist',
                    life: 3000,
                });
            } else if (res.data.message.includes('removed')) {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Wishlist Updated',
                    detail: 'Item removed from wishlist',
                    life: 3000,
                });
            }
        })
        .catch(() => {
            // Revert optimistic toggle on failure
            setLocalInWishlist(prev => !prev);
            toggleWishlist(item); // revert context
            toast.current.show({
                severity: 'error',
                summary: 'Wishlist Error',
                detail: 'Failed to update wishlist',
                life: 3000,
            });
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <>
            <Toast ref={toast} />
            {iconOnly ? (
                <Button
                    icon={loading ? null : (localInWishlist ? 'pi pi-heart-fill' : 'pi pi-heart')}
                    className={`wishlist-icon-button ${localInWishlist ? 'p-button-danger' : ''}`}
                    onClick={handleWishListToggle}
                    aria-label="Toggle Wishlist"
                    disabled={loading}
                    label={
                        loading ? (
                            <ProgressSpinner
                                style={{ width: '20px', height: '20px' }}
                                strokeWidth="8"
                                fill="var(--surface-ground)"
                                animationDuration=".5s"
                            />
                        ) : null
                    }
                />
            ) : (
                <Button
                    label={
                        loading ? (
                            <span className="wishlist-spinner-wrapper">
                                <ProgressSpinner
                                    style={{ width: '14px', height: '14px' }}
                                />
                            </span>
                        ) : (
                            localInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'
                        )
                    }
                    icon={loading ? null : (localInWishlist ? PrimeIcons.TIMES : PrimeIcons.HEART)}
                    className={`add-to-wishlist-btn ${
                        localInWishlist ? 'p-button-danger' : 'p-button-info'
                    }`}
                    onClick={handleWishListToggle}
                    disabled={loading}
                />
            )}
        </>
    );
};
