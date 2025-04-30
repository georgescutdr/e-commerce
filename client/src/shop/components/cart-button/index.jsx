import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../cards/dropdown/shopping-cart/product-card';
import './cart-button.css';

export const CartButton = ({ cartItems = {}, loading = false }) => {
  const op = useRef(null);
  const navigate = useNavigate();
  const cartArray = Object.values(cartItems);
  const itemCount = cartArray.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartArray.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
        label="Cart"
        icon="pi pi-shopping-cart"
        className="p-button-text"
        disabled
      />
    );
  }

  return (
    <div
      className="cart-button-hover-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <OverlayPanel ref={op} className="cart-dropdown-panel">
        {itemCount === 0 ? (
          <div className="empty-cart">Your cart is empty.</div>
        ) : (
          <>
            {cartArray.slice(0, 3).map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
            <div className="cart-total-row">
              <span className="cart-total-label">TOTAL: {itemCount} product{itemCount > 1 ? 's' : ''}</span>
              <span className="cart-total-amount">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="cart-dropdown-footer">
            <Button
                label="Checkout"
                icon="pi pi-credit-card"
                className="p-button-sm p-button-text checkout-button"
                onClick={() => navigate('/checkout')}
              />
              <Button
                label="View Cart"
                icon="pi pi-shopping-cart"
                className="p-button-sm p-button-text cart-button"
                onClick={() => navigate('/shopping-cart')}
              />
            </div>
          </>
        )}
      </OverlayPanel>

      <div className="cart-button-wrapper">
        <Button
          label="Cart"
          icon="pi pi-shopping-cart"
          className="p-button-text"
        />
        {itemCount > 0 && (
          <span className="item-count-badge">{itemCount}</span>
        )}
      </div>
    </div>
  );
}; 