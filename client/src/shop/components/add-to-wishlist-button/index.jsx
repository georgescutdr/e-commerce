import React, { useRef, useState, useEffect } from 'react';
import './add-to-wishlist-button.css';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import Axios from 'axios';
import { shopConfig } from '../../../config.js';
import { useWishlist } from '../../context/wishlist-context';
import { getUser } from '../../../utils/auth-helpers';

export const AddToWishlistButton = ({ item, iconOnly = false, toast }) => {
  const [loading, setLoading] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();

  const user = getUser();
  const itemId = String(item?.id);
  const inWishlist = isInWishlist(itemId);

  const handleWishListToggle = () => {
    if (loading) return;

    setLoading(true);

    if (user?.id) {
      // Logged-in: call backend
      Axios.post(shopConfig.api.wishlistToggleUrl, {
        userId: user.id,
        productId: itemId,
      })
        .then((res) => {
          toggleWishlist(item);
          const message = res.data.message || '';
          toast?.current?.show({
            severity: message.includes('added') ? 'success' : 'warn',
            summary: 'Wishlist Updated',
            detail: message.includes('added') ? 'Item added to wishlist' : 'Item removed from wishlist',
            life: 3000,
          });
        })
        .catch(() => {
          toast?.current?.show({
            severity: 'error',
            summary: 'Wishlist Error',
            detail: 'Failed to update wishlist',
            life: 3000,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // Guest: only update local wishlist
      toggleWishlist(item);
      toast?.current?.show?.({
        severity: inWishlist ? 'warn' : 'success',
        summary: 'Wishlist Updated',
        detail: inWishlist ? 'Item removed from wishlist' : 'Item added to wishlist',
        life: 3000,
      });
      setLoading(false);
    }
  };


  return (
    <>
      {iconOnly ? (
        <Button
          icon="pi"
          className={`wishlist-icon-button ${inWishlist ? 'p-button-danger' : ''}`}
          onClick={(e) => {
            console.log('Button clicked');
            handleWishListToggle();
          }}
          disabled={loading}
        >
          <span
            className={`pi ${loading ? 'pi-spin pi-spinner' : inWishlist ? 'pi-heart-fill' : 'pi-heart'}`}
            style={{ fontSize: '1rem' }}
          />
        </Button>
      ) : (
        <Button
          label={
            loading ? (
              <span className="wishlist-spinner-wrapper">
                <ProgressSpinner style={{ width: '10px', height: '10px' }} strokeWidth="4" />
              </span>
            ) : inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'
          }
          icon={loading ? null : inWishlist ? PrimeIcons.TIMES : PrimeIcons.HEART}
          className={`add-to-wishlist-btn ${inWishlist ? 'p-button-danger' : 'p-button-info'}`}
          onClick={handleWishListToggle}
          disabled={loading}
        />
      )}
    </>
  );
};
