import React, { useContext } from 'react';
import { ShopContext } from './context/shop-context';
import './shopping-cart.css';

export const ShoppingCart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(ShopContext);
  const items = Object.values(cartItems);

  return (
    <div className="shopping-cart-container">
      <h2>Your Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="shopping-cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {items.map(({ id, name, price, quantity }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>${price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => updateQuantity(id, parseInt(e.target.value))}
                  />
                </td>
                <td>${(price * quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeFromCart(id)}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
