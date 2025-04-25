import React, { useContext } from 'react';
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
        name: item.name,
        price: item.price,
        brand: item.brand_array?.[0]?.name,
        promotion_array: item.promotion_array 
      });
    };


    console.log("AddToCart context:", useContext(ShopContext));

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
