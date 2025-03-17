import React from 'react';
import { useCart } from './CartContext';

export const ShoppingCart = () => {
  const { cartItems, removeFromCart, getTotalPrice } = useCart();

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
                <button onClick={() => removeFromCart(item)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${getTotalPrice()}</h3>
        </div>
      )}
    </div>
  );
};
