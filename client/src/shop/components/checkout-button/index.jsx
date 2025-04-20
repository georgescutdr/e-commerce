import React, { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';
import './checkout-button.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';

export const CheckoutButton = ({item, props}) => {
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout')
    };

    return (
        <>
            <Button
                label="Proceed to Checkout"
                icon="pi pi-credit-card"
                className="p-button-rounded p-button-info add-to-cart-btn"
                onClick={ handleCheckout }
            />  
        </>
    );
};
