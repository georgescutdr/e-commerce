import React, { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';
import { CheckoutButton } from '../../components/checkout-button'
import { Button } from 'primereact/button'; // <- Import PrimeReact Button
import './shopping-cart.css';

 const ShoppingCart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(ShopContext);
  const items = Object.values(cartItems);

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
    // You can route to a checkout page or trigger logic here
  };

  return (
    <div className="shopping-cart-container">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
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
              {items.map(({ id, brand, name, price, quantity }) => (
                <tr key={id}>
                  <td>{brand + ' ' + name}</td>
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

          <div className="checkout-button-container">
            <CheckoutButton />
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;