import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';

export const CartButton = ({ cartItems = {}, loading = false }) => {
  const cartMenuRef = useRef(null);
  const navigate = useNavigate();

  const dropdownIcon = 'pi pi-chevron-down';
  const cartArray = Object.values(cartItems);
  const itemCount = cartArray.reduce((sum, item) => sum + item.quantity, 0);

  const menuItems = cartArray.slice(0, 5).map((item) => ({
    label: item.name,
    icon: 'pi pi-shopping-cart',
    command: () => navigate('/shopping-cart'),
  }));

  if (loading) {
    return (
      <Button
        label="Cart"
        icon="pi pi-shopping-cart"
        className="p-button-text"
        disabled
      />
    );
  }

  return itemCount > 0 ? (
    <>
      <Menu model={menuItems} popup ref={cartMenuRef} />
      <div className="cart-button-wrapper">
      <Button
        label="Cart"
        icon="pi pi-shopping-cart"
        className="p-button-text"
        onClick={(e) => cartMenuRef.current.toggle(e)}
      />
      {itemCount > 0 && (
        <span className="item-count-badge">{itemCount}</span>
      )}
    </div>
    </>
  ) : (
    <Button
      label="Cart"
      icon="pi pi-shopping-cart"
      className="p-button-text"
      onClick={() => navigate('/shopping-cart')}
    />
  );
};
