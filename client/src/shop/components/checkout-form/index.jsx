import React, { useState, useRef, useEffect, useContext } from 'react';
import Axios from 'axios';
import { ShopContext } from '../../context/shop-context';
import { AuthContext } from '../../context/auth-context';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { shopConfig } from '../../../config';
import { Toast } from 'primereact/toast';
import { Link } from 'react-router-dom';
import './checkout-form.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css';

export const CheckoutForm = () => {
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [shippingErrors, setShippingErrors] = useState({});
    const [paymentErrors, setPaymentErrors] = useState({});
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [shippingData, setShippingData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        phone: '',
        email: '',
        instructions: ''
    });
    const [paymentData, setPaymentData] = useState({
        cardNumber: '',
        nameOnCard: '',
        expiryDate: '',
        cvv: ''
    });

    const { cartItems, updateQuantity, removeFromCart, appliedVouchers } = useContext(ShopContext);
    const cartItemsArr = Object.values(cartItems) || [];
    const toast = useRef(null);
    const stepperRef = useRef(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        Axios.post(shopConfig.getItemsUrl, {table: 'shipping_information', user_id: user?.id}).then((result) => {
            const addresses = result.data.map((item) => ({
                ...item,
                label: item.address 
            }));
            const defaultOption = { id: null, label: 'Enter a new address' };
            setSavedAddresses([defaultOption, ...addresses]);
        });
    }, [user]);

    const handleShippingChange = (e) => {
        setShippingData({ ...shippingData, [e.target.name]: e.target.value });
    };

    const handlePaymentChange = (e) => {
        setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
    };

    const validateShipping = () => {
        const errors = {};
        if (!shippingData.name.trim()) errors.name = 'Full Name is required';
        if (!shippingData.address.trim()) errors.address = 'Address is required';
        if (!shippingData.city.trim()) errors.city = 'City is required';
        if (!shippingData.state.trim()) errors.state = 'State is required';
        if (!shippingData.postal_code.trim()) errors.postal_code = 'Postal Code is required';
        if (!shippingData.country.trim()) errors.country = 'Country is required';
        if (!shippingData.phone.trim()) errors.phone = 'Phone is required';
        if (!shippingData.email.trim()) errors.email = 'Email is required';
        setShippingErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validatePayment = () => {
        const errors = {};
        if (!paymentData.cardNumber.trim()) errors.cardNumber = 'Card Number is required';
        if (!paymentData.nameOnCard.trim()) errors.nameOnCard = 'Name on Card is required';
        if (!paymentData.expiryDate.trim()) errors.expiryDate = 'Expiry Date is required';
        if (!paymentData.cvv.trim()) errors.cvv = 'CVV is required';
        setPaymentErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleNextShipping = () => {
        if (validateShipping()) {
            setActiveStep(1);
        }
    };

    const handleNextPayment = () => {
        if (validatePayment()) {
            setActiveStep(2);
        }
    };

    const handlePlaceOrder = async () => {
        try {
            const orderPayload = {
                user_id: user.id,
                total: cartItemsArr.reduce((total, item) => {
                    // Apply discounts to each item
                    const voucher = appliedVouchers[item.id];
                    let discount = 0;
                    if (voucher) {
                        if (voucher.type === 'percentage') {
                            discount = (item.price * voucher.value) / 100;
                        } else if (voucher.type === 'fixed') {
                            discount = voucher.value;
                        }
                    }
                    return total + (item.price - discount) * item.quantity;
                }, 0),
                payment_method: 'Card',
                shipping_method: 'Standard',
                discount: 0, // Can be calculated based on total discount applied
                shipping_cost: 5.00,
                tax_amount: 8.00,
                shippingData: shippingData,
                cartItemsArr: cartItemsArr.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: item.price
                }))
            };

            const response = await Axios.post(shopConfig.api.saveOrderUrl, orderPayload);

            if (response.status === 201) {
                const orderDetailsUrl = `/order-details/${response.order_id}`;
                // navigate(orderDetailsUrl);
            } else {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Order Failed',
                    detail: 'Failed to place order. Please try again.',
                    life: 4000
                });
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'An error occurred while placing the order.',
                life: 4000
            });
        }
    };

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);

        if (!address || address.id === null) {
            setShippingData({
                name: '',
                address: '',
                city: '',
                state: '',
                postal_code: '',
                country: '',
                phone: '',
                email: '',
                instructions: ''
            });
        } else {
            setShippingData({
                name: address.name,
                address: address.address,
                city: address.city,
                state: address.state,
                postal_code: address.postal_code,
                country: address.country,
                phone: address.phone,
                email: address.email,
                instructions: address.instructions,
            });
        }
    };

    const totalDiscount = cartItemsArr.reduce((acc, item) => {
        const voucher = appliedVouchers?.[item.product_id];
        let discount = 0;
        if (voucher) {
          discount = voucher.type === 'percentage'
            ? (item.price * voucher.value) / 100
            : voucher.value;
        }
        return acc + discount * item.quantity;
    }, 0);

    return (
        <>
            <Toast ref={toast} />
            {typeof activeStep === 'number' && (
                <Stepper 
                    ref={stepperRef}
                    activeStep={activeStep}
                    onStepChange={(e) => setActiveStep(e.index)}
                    style={{ flexBasis: '50rem' }}
                >
                    <StepperPanel header="Shipping Information">
                        <div className="flex flex-column gap-4 h-12rem">
                            <Dropdown
                                value={selectedAddress}
                                options={savedAddresses}
                                onChange={(e) => handleAddressSelect(e.value)}
                                optionLabel="label"
                                placeholder="Select a saved address"
                                className="w-full md:w-30rem"
                            />

                            <div className="surface-border p-4 surface-ground">
                                <div className="p-fluid grid formgrid">
                                    <div className="field col-12 md:col-6">
                                        <label>Full Name</label>
                                        <input type="text" name="name" value={shippingData.name} onChange={handleShippingChange} />
                                        {shippingErrors.name && <span className="error-text">{shippingErrors.name}</span>}
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label>Address</label>
                                        <input type="text" name="address" value={shippingData.address} onChange={handleShippingChange} />
                                        {shippingErrors.address && <span className="error-text">{shippingErrors.address}</span>}
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label>City</label>
                                        <input type="text" name="city" value={shippingData.city} onChange={handleShippingChange} />
                                        {shippingErrors.city && <span className="error-text">{shippingErrors.city}</span>}
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label>State</label>
                                        <input type="text" name="state" value={shippingData.state} onChange={handleShippingChange} />
                                        {shippingErrors.state && <span className="error-text">{shippingErrors.state}</span>}
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label>Country</label>
                                        <input type="text" name="country" value={shippingData.country} onChange={handleShippingChange} />
                                        {shippingErrors.country && <span className="error-text">{shippingErrors.country}</span>}
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label>Phone</label>
                                        <input type="text" name="phone" value={shippingData.phone} onChange={handleShippingChange} />
                                        {shippingErrors.phone && <span className="error-text">{shippingErrors.phone}</span>}
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label>E-mail</label>
                                        <input type="text" name="email" value={shippingData.email} onChange={handleShippingChange} />
                                        {shippingErrors.email && <span className="error-text">{shippingErrors.email}</span>}
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label>Postal Code</label>
                                        <input type="text" name="postal_code" value={shippingData.postal_code} onChange={handleShippingChange} />
                                        {shippingErrors.postal_code && <span className="error-text">{shippingErrors.postal_code}</span>}
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label>Instructions</label>
                                        <InputTextarea value={ shippingData.instructions } onChange={handleShippingChange} rows={5} cols={30} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex pt-4 justify-content-end">
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={handleNextShipping} />
                        </div>
                    </StepperPanel>

                    <StepperPanel header="Payment Details">
                        <div className="flex flex-column h-12rem">
                            <div className="surface-border p-4 surface-ground w-full">
                                <div className="p-fluid grid formgrid">
                                    <div className="field col-12 md:col-6">
                                        <label>Card Number</label>
                                        <input type="text" name="cardNumber" value={paymentData.cardNumber} onChange={handlePaymentChange} />
                                        {paymentErrors.cardNumber && <span className="error-text">{paymentErrors.cardNumber}</span>}
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label>Name on Card</label>
                                        <input type="text" name="nameOnCard" value={paymentData.nameOnCard} onChange={handlePaymentChange} />
                                        {paymentErrors.nameOnCard && <span className="error-text">{paymentErrors.nameOnCard}</span>}
                                    </div>
                                    <div className="field col-6 md:col-3">
                                        <label>Expiry Date</label>
                                        <input type="text" name="expiryDate" value={paymentData.expiryDate} onChange={handlePaymentChange} />
                                        {paymentErrors.expiryDate && <span className="error-text">{paymentErrors.expiryDate}</span>}
                                    </div>
                                    <div className="field col-6 md:col-3">
                                        <label>CVV</label>
                                        <input type="text" name="cvv" value={paymentData.cvv} onChange={handlePaymentChange} />
                                        {paymentErrors.cvv && <span className="error-text">{paymentErrors.cvv}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex pt-4 justify-content-between">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => setActiveStep(0)} />
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={handleNextPayment} />
                        </div>
                    </StepperPanel>

                    <StepperPanel header="Review & Confirm">
                        <div className="flex flex-column h-12rem gap-4 checkout-cart">
                            <div className="p-4 surface-ground w-full">
                                <p className="mb-3 font-bold text-lg">Please review your shipping and payment information:</p>
                                <ul className="mb-4">
                                    <li><strong>Name:</strong> {shippingData.name}</li>
                                    <li><strong>Address:</strong> {shippingData.address}, {shippingData.city}, {shippingData.postal_code}</li>
                                    <li><strong>Card:</strong> **** **** **** {paymentData?.cardNumber?.slice(-4) ?? 'XXXX'}</li>
                                </ul>
                                    {cartItemsArr.length > 0 && (
                                        <p className="mb-3 font-bold">Your Cart:</p>
                                    )}
                                    {cartItemsArr.length > 0 && cartItemsArr.map(item => {
                                        const totalItemDiscount = item.promotions?.reduce((acc, promo) => {
                                            const discount = promo.type === 'percentage'
                                                ? (item.price * promo.value) / 100
                                                : promo.value;
                                            return acc + discount;
                                        }, 0) || 0;

                                        const discountedPrice = Math.max(item.price - totalItemDiscount, 0);

                                        return (
                                            <div key={item.id} className="cart-item">
                                              <img
                                                src={item.image
                                                  ? `/public/uploads/product/${item.id}/${item.files[0].file_name}`
                                                  : '/public/uploads/default-image.jpg'}
                                                alt={item.name}
                                                className="cart-item-img"
                                              />

                                              <div className="cart-item-content">
                                                <div className="product-title">
                                                  <Link to={`/${item.name}/pd/${item.id}/view_product`}>
                                                    <span className="product-title-link">{`${item.brand} ${item.name}`}</span>
                                                  </Link>
                                                </div>

                                                <div className="quantity-control">
                                                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="qty-btn">−</button>
                                                  <span className="qty-text">{item.quantity}</span>
                                                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="qty-btn">+</button>
                                                </div>

                                                <div className="cart-price">
                                                  {totalItemDiscount > 0 && (
                                                    <span className="original-price">${(item.price * item.quantity).toFixed(2)}</span>
                                                  )}
                                                  ${(discountedPrice * item.quantity).toFixed(2)}
                                                </div>

                                                <div className="cart-promotions">
                                                  {item.promotions?.length > 0 && (
                                                    <div className="promotions">
                                                      {item.promotions.map(promo => (
                                                        <div key={promo.id} className="promo-item">
                                                          <i className="pi pi-tags promo-icon"></i>
                                                          <span>
                                                            {promo.name} ({promo.type === 'percentage' ? `${promo.value}%` : `$${promo.value}`})
                                                          </span>
                                                        </div>
                                                      ))}
                                                    </div>
                                                  )}
                                                  {appliedVouchers?.[item.product_id] && (
                                                    <div className="promo-item voucher">
                                                      <i className="pi pi-percentage promo-icon"></i>
                                                      <span>
                                                        Voucher: {appliedVouchers[item.product_id].name || appliedVouchers[item.product_id].code} (
                                                        {appliedVouchers[item.product_id].type === 'percentage'
                                                          ? `${appliedVouchers[item.product_id].value}%`
                                                          : `$${appliedVouchers[item.product_id].value}`})
                                                      </span>
                                                    </div>
                                                  )}
                                                </div>

                                              </div>

                                              <button onClick={() => removeFromCart(item.id)} className="cart-remove-btn">
                                                <i className="pi pi-trash"></i>
                                              </button>
                                            </div>

                                        );
                                    })}

                                    {cartItemsArr.length <= 0 && (
                                        <div className="cart-empty">
                                            Your cart is empty
                                        </div>
                                    )}
                            </div>
                        </div>
                        <div className="cart-summary">
                          {cartItemsArr.some(item =>
                              (item.promotions && item.promotions.length > 0) ||
                              appliedVouchers?.[item.product_id]
                            ) && (
                              <p className="cart-saved">
                                <i className="pi pi-tag cart-saved-icon"></i>
                                You saved: $
                                {cartItemsArr.reduce((saved, item) => {
                                  const promoDiscount = item.promotions?.reduce((acc, promo) => {
                                    const discount =
                                      promo.type === 'percentage'
                                        ? (item.price * promo.value) / 100
                                        : promo.value;
                                    return acc + discount;
                                  }, 0) || 0;

                                  const basePrice = Math.max(item.price - promoDiscount, 0);
                                  const voucher = appliedVouchers?.[item.product_id];
                                  const voucherDiscount = voucher
                                    ? voucher.type === 'percentage'
                                      ? (basePrice * voucher.value) / 100
                                      : voucher.value
                                    : 0;

                                  return saved + (promoDiscount + voucherDiscount) * item.quantity;
                                }, 0).toFixed(2)}
                              </p>
                            )}


                          <span className="cart-total">
                            Total: $
                            {cartItemsArr.reduce((total, item) => {
                              const promoDiscount = item.promotions?.reduce((acc, promo) => {
                                const discount =
                                  promo.type === 'percentage'
                                    ? (item.price * promo.value) / 100
                                    : promo.value;
                                return acc + discount;
                              }, 0) || 0;

                              const basePrice = Math.max(item.price - promoDiscount, 0);
                              const voucher = appliedVouchers?.[item.product_id];
                              const voucherDiscount = voucher
                                ? voucher.type === 'percentage'
                                  ? (basePrice * voucher.value) / 100
                                  : voucher.value
                                : 0;

                              const finalPrice = Math.max(basePrice - voucherDiscount, 0);
                              return total + finalPrice * item.quantity;
                            }, 0).toFixed(2)}
                          </span>
                        </div>

                        <div className="flex pt-4 justify-content-between">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => setActiveStep(1)} />
                            <Button label="Place Order" icon="pi pi-check" onClick={handlePlaceOrder} />
                        </div>
                    </StepperPanel>
                </Stepper>
            )}
        </>
    );
};
