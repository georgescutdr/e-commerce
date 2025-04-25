import React, { useState } from 'react';
import Axios from 'axios';
import { shopConfig } from '../../../config';
import { useShop } from '../../context/shop-context';
import './voucher-form.css';

export const VoucherForm = () => {
  const [voucherCode, setVoucherCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { cartItems, applyVoucherGlobally } = useShop();

  const handleVoucherSubmit = async (e) => {
    e.preventDefault();
    const productIds = Object.keys(cartItems);

    if (productIds.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      const response = await Axios.post(shopConfig.api.submitVoucherUrl, {
        voucher_code: voucherCode,
        user_id: 1, // Replace with real user ID
        product_ids: productIds.map(id => parseInt(id)) // send all cart product IDs
      });

      const { message, voucher, validProducts } = response.data;

      setSuccess(message);
      setError('');
      setVoucherCode('');

      if (voucher && validProducts?.length) {
        applyVoucherGlobally(voucher, validProducts);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred while applying the voucher.');
      }
      setSuccess('');
    }
  };

  return (
    <div className="voucher-form">
      <h3>Apply Voucher</h3>
      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}
      <form onSubmit={handleVoucherSubmit}>
        <input
          type="text"
          placeholder="Enter voucher code"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
        />
        <button className="submit-btn" type="submit">Apply Voucher</button>
      </form>
    </div>
  );
};
