import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/shop-context';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { Header } from '../../components/header';
import './shopping-cart.css';

const ShoppingCart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(ShopContext);
  const items = Object.values(cartItems);
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    navigate('/checkout');
  };

  const getDiscountedPrice = (item) => {
    let promoDiscount = 0;
    let voucherDiscount = 0;

    if (item.promotions) {
      item.promotions.forEach(promo => {
        promoDiscount += promo.type === 'percentage'
          ? (item.price * promo.value) / 100
          : promo.value;
      });
    }

    if (item.vouchers) {
      item.vouchers.forEach(voucher => {
        voucherDiscount += voucher.type === 'percentage'
          ? ((item.price - promoDiscount) * voucher.value) / 100
          : voucher.value;
      });
    }

    const discountedPrice = Math.max(item.price - promoDiscount - voucherDiscount, 0);
    const originalTotal = item.price * item.quantity;
    const discountedTotal = discountedPrice * item.quantity;
    const totalSaved = originalTotal - discountedTotal;

    return {
      originalTotal,
      discountedTotal,
      totalSaved,
      discountedPrice,
    };
  };

  let totalOriginal = 0;
  let totalDiscounted = 0;
  let totalSavings = 0;

  items.forEach(item => {
    const { originalTotal, discountedTotal, totalSaved } = getDiscountedPrice(item);
    totalOriginal += originalTotal;
    totalDiscounted += discountedTotal;
    totalSavings += totalSaved;
  });

  return (
    <>
    <Header />
    <div className="shopping-cart-container">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="shopping-cart-table">
            <thead>
              <tr>
                 <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th style={{ textAlign: 'center' }}>Remove</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => {
                const {
                  originalTotal,
                  discountedTotal,
                  discountedPrice,
                } = getDiscountedPrice(item);

                return (
                  <tr key={item.id}>
                    <td style={{ textAlign: 'center' }}>
                        <img
                            src={item.image
                                ? `/public/uploads/product/${item.id}/${item.files[0].file_name}`
                                : '/public/uploads/default-image.jpg'}
                            alt={item.name}
                            className="cart-item-img"
                        />
                    </td>
                    <td>
                      <div className="product-title">
                          <Link to={`/${item.name}/pd/${item.id}/view_product`}>
                              <span className="product-title-link">{`${item.brand} ${item.name}`}</span>
                           </Link>
                      </div>
                      {item.promotions?.length > 0 && (
                          <div className="promotions">
                            <strong>
                              <i className="pi pi-tag" style={{ marginRight: '8px' }}></i>
                              Promotions:
                            </strong>
                            <ul>
                              {item.promotions.map(promo => (
                                <li key={promo.id} className="promotion-item">
                                  {promo.name} (-{promo.type === 'percentage' ? `${promo.value}%` : `$${promo.value}`})
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {item.vouchers?.length > 0 && (
                          <div className="vouchers">
                            <strong>
                              <i className="pi pi-credit-card" style={{ marginRight: '8px' }}></i>
                              Vouchers:
                            </strong>
                            <ul>
                              {item.vouchers.map((voucher, index) => (
                                <li key={index} className="voucher-item">
                                  <i className="pi pi-tag" style={{ marginRight: '8px' }}></i>
                                  {voucher.name || voucher.code} ({voucher.type === 'percentage' ? `${voucher.value}%` : `$${voucher.value}`})
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </td>

                    <td>
                      <div className="price-cell">
                        <span className="original-price">${item.price.toFixed(2)}</span>
                        <br />
                        <span className="discounted-price">${discountedPrice.toFixed(2)}</span>
                      </div>
                    </td>

                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="quantity-input"
                      />
                    </td>

                    <td>
                      <div className="total-cell">
                        <span className="original-total">${originalTotal.toFixed(2)}</span>
                        <br />
                        <span className="discounted-total">${discountedTotal.toFixed(2)}</span>
                      </div>
                    </td>

                    <td style={{ textAlign: 'center' }}>
                      <button onClick={() => removeFromCart(item.id)} className="icon-trash-button">
                          <i className="pi pi-trash"></i>
                        </button>

                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="cart-summary">
            <div className="summary-line">
              <span><i className="pi pi-book" /> Original Total:</span>
              <span className="strikethrough">${totalOriginal.toFixed(2)}</span>
            </div>
            <div className="summary-line savings">
              <span><i className="pi pi-tag savings-icon" /> You Saved:</span>
              <span className="savings-amount">-${totalSavings.toFixed(2)}</span>
            </div>
            <div className="summary-line final-total">
              <span><i className="pi pi-check-circle total-icon" /> Final Total:</span>
              <span className="highlight">${totalDiscounted.toFixed(2)}</span>
            </div>
            <div className="checkout-button-container">
              <Button
                label="Proceed to Checkout"
                icon="pi pi-credit-card"
                onClick={handleCheckoutClick}
                className="p-button-success p-button-rounded"
              />
            </div>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default ShoppingCart;
