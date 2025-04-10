import React, { useContext } from 'react';
import { ShopContext } from '../context/shop-context';
import './item-grid.css';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';

export const AddToCartButton = ({item}) => {
    const { addToCart } = useContext(ShopContext);

    const handleAddToCart = () => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
        });
    };
    
    return (
        <>
            <Button
                label="Add to Cart"
                icon="pi pi-shopping-cart"
                className="p-button-rounded p-button-info add-to-cart-btn"
                onClick={ handleAddToCart }
            />  
        </>
    );
};
