import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';

export const WishlistButton = ({ wishlistItems = [], loading = false }) => {
  const wishlistMenuRef = useRef(null);
  const navigate = useNavigate();

  const dropdownIcon = 'pi pi-chevron-down';

  const menuItems = wishlistItems.slice(0, 5).map((item) => ({
    label: item.name,
    icon: 'pi pi-heart',
    command: () => navigate(`/wishlist/${item.id}`),
  }));

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

  return wishlistItems.length > 0 ? (
    <>
      <Menu model={menuItems} popup ref={wishlistMenuRef} />
      <Button
        label="Wishlist"
        icon="pi pi-heart"
        className="p-button-text"
        onClick={(e) => wishlistMenuRef.current.toggle(e)}
      >
        <span className="item-count-badge">{wishlistItems.length}</span>
      </Button>
    </>
  ) : (
    <Button
      label="Wishlist"
      icon="pi pi-heart"
      className="p-button-text"
      onClick={() => navigate('/wishlist')}
    />
  );
};
