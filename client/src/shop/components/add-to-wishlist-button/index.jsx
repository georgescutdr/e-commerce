import React, { useState, useEffect, useRef } from 'react';
import './add-to-wishlist-button.css';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { Toast } from 'primereact/toast';
import Axios from 'axios';
import { shopConfig } from '../../../config.js';
import { useWishlist } from '../../context/wishlist-context';

export const AddToWishlistButton = ({ item, userId }) => {
    const [inWishlist, setInWishlist] = useState(false);
    const toast = useRef(null);

    const { toggleWishlist, isInWishlist } = useWishlist();

    useEffect(() => {
       
    }, [item.id, userId]);

    const handleWishListToggle = () => {
        //toggle item in the wishlist from the local storage
        toggleWishlist(item)

        //toggle in the db
        Axios.post(shopConfig.api.wishlistToggleUrl, {
                userId: userId,
                productId: item.id,
            })
            .then((res) => {
                if (res.data.message.includes('added')) {
                    setInWishlist(true);
                    toast.current.show({
                        severity: 'success',
                        summary: 'Wishlist Updated',
                        detail: 'Item added to wishlist',
                        life: 3000,
                    });
                } else if (res.data.message.includes('removed')) {
                    setInWishlist(false);
                    toast.current.show({
                        severity: 'warn',
                        summary: 'Wishlist Updated',
                        detail: 'Item removed from wishlist',
                        life: 3000,
                    });
                }
            })
            .catch((err) => {
                toast.current.show({
                    severity: 'error',
                    summary: 'Wishlist Error',
                    detail: 'Failed to update wishlist',
                    life: 3000,
                });
            })
    };

    return (
        <>
            <Toast ref={toast} />
            <Button
                label={isInWishlist(item.id)  ? 'Remove from Wishlist' : 'Add to Wishlist'}
                icon={isInWishlist(item.id)  ? PrimeIcons.TIMES : PrimeIcons.HEART}
                className={`p-button-rounded p-button-outlined add-to-favourites-btn ${
                    isInWishlist(item.id) ? 'p-button-danger' : 'p-button-info'
                }`}
                onClick={handleWishListToggle}
            />
        </>
    );
};
