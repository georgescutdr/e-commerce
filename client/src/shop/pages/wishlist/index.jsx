import React, { useEffect, useState, useRef } from 'react';
import Axios from 'axios';
import { shopConfig } from '../../../config';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { AddToCartButton } from '../../components/add-to-cart-button'
import { Card } from 'primereact/card';
import './wishlist.css';

const Wishlist = ({ userId }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);

    // Load from localStorage if available
    useEffect(() => {
        const stored = localStorage.getItem('wishlistItems');
        if (stored) {
            setItems(JSON.parse(stored));
        }
    }, []);

    // Fetch and sync with backend
    useEffect(() => {
        if (!userId) return;
        Axios.get(shopConfig.api.getWishlistUrl, { params: { userId: userId } })
            .then((res) => {
                const wishlist = res.data.wishlist || [];
                setItems(wishlist);
                localStorage.setItem('wishlistItems', JSON.stringify(wishlist));
            })
            .catch((err) => {
                console.error('Error loading wishlist:', err);
            })
            .finally(() => setLoading(false));
    }, [userId]);

    const handleRemove = async (productId) => {
        try {
            await Axios.post(shopConfig.api.wishlistToggleUrl, {
                userId: userId,
                productId: productId,
            });

            const updated = items.filter((item) => item.id !== productId);
            setItems(updated);
            localStorage.setItem('wishlistItems', JSON.stringify(updated));

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
                {items.length > 0 ? (
                    <p className="wishlist-info-text">{items.length} product{items.length > 1 ? 's' : ''} in your wishlist</p>
                ) : (
                    <p className="wishlist-info-text">Your wishlist is empty.</p>
                )}
            </Card>

            {loading ? (
                <div className="wishlist-loader">
                    <ProgressSpinner />
                </div>
            ) : items.length === 0 ? (
                <p className="wishlist-empty">Your wishlist is empty.</p>
            ) : (
                <div className="wishlist-cards-container">
                    {items.map((item) => (
                        <div key={item.id} className="wishlist-card">
                            <div className="wishlist-card-image">
                                <img 
                                    src={
                                      item.files && item.files.length > 0
                                        ? `/public/uploads/${props.table}/${item.id}/${item.files[0].file_name}`
                                        : '/public/uploads/default-image.jpg'
                                    } 
                                    alt={item.name} 
                                />
                            </div>
                            <div className="wishlist-card-details">
                                <h3>{item.brand} {item.name}</h3>
                                <p><Rating value={item.rating || 0} readOnly cancel={false} stars={5} />{ 4.82 }</p>
                            </div>
                            <div className="wishlist-card-actions">
                                <AddToCartButton item={ item } props={{label: false}} />
                                <Button
                                    icon="pi pi-trash"
                                    className="p-button-sm p-button-text p-button-danger mt-2 remove-btn"
                                    label="Remove"
                                    onClick={() => handleRemove(item.id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;