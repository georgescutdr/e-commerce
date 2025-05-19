import React, { useContext, useState } from 'react';
import { ShopContext } from '../../context/shop-context';
import './add-to-cart-button.css';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';

export const AddToCartButton = ({item, props = {}}) => {
    const { addToCart } = useContext(ShopContext);

    const handleAddToCart = () => {
      addToCart({
        id: item.id,
        product_id: item.id,
        category_id: item.category_id,
        name: item.name,
        price: item.price,
        brand_name: item.brand_name,
        promotion_array: item.promotion_array 
      });
    };

    const label = props.label && props.label === false ? '' : 'Add to Cart' 
    
    return (
        <>
            <Button
                label={ label }
                icon="pi pi-shopping-cart"
                className="p-button-rounded p-button-info add-to-cart-btn"
                onClick={ handleAddToCart }
            />  
        </>
    );
};
