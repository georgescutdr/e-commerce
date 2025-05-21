import React, { useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import Axios from 'axios';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../context/wishlist-context';
import { ProductCard } from '../cards/dropdown/wishlist/product-card';
import { shopConfig } from '../../../config';
import { getUser, isLoggedIn } from '../../../utils/auth-helpers';
import './wishlist-button.css';

export const WishlistButton = ({ loading = false }) => {
  const user = getUser();
  const op = useRef(null);
  const navigate = useNavigate();
  const { loadWishlist, wishlistArray } = useWishlist();

  useEffect(() => {
    const fetchItems = async () => {
      if (user?.id) {
        try {
          const response = await Axios.get(shopConfig.api.getWishlistUrl, { params: { userId: user.id } });
          loadWishlist(response.data);
        } catch (error) {
          console.error('Failed to fetch wishlist from server:', error);
        }
      }
      // else: guests already load from localStorage via context by default
    };

    fetchItems();
  }, [user, loadWishlist]);

  const items = wishlistArray;

  const handleMouseEnter = (e) => {
    if (op.current) {
      op.current.show(e);
    }
  };

  const handleMouseLeave = () => {
    if (op.current) {
      op.current.hide();
    }
  };

  if (loading) {
    return (
      <Button
        label="Wishlist"
        icon="pi pi-heart"
        className="p-button-text"
        disabled
      />
    );
  }

  return (
    <div
      className="wishlist-button-hover-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <OverlayPanel ref={op} className="wishlist-dropdown-panel">
        {!Array.isArray(items) || items.length === 0 ? (
          <div className="empty-wishlist">Your wishlist is empty.</div>
        ) : (
          <>
            {items.slice(0, 3).map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
            <div className="wishlist-dropdown-footer">
              <Button
                label="View Wishlist"
                icon="pi pi-heart"
                className="p-button-sm p-button-text wishlist-view-button"
                onClick={() => navigate('/wishlist')}
              />
            </div>
          </>
        )}
      </OverlayPanel>

      <div className="wishlist-button-wrapper">
        <Button
          label="Wishlist"
          icon="pi pi-heart"
          className="p-button-text"
        />
        {items.length > 0 && (
          <span className="item-count-badge">{items.length}</span>
        )}
      </div>
    </div>
  );
};
