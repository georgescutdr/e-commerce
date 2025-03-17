import React, {useContext} from 'react'
import { ShopContext } from '../../../context/shop-context'
import { Button } from 'primereact/button'
import { useCart } from '../context/cart-context'
import 'primeicons/primeicons.css'
//import './cart.css'

export const AddToCartBtn = ({product}) => {

    const addToCart = (item) => {
        setCartItems((prevCartItems) => [...prevCartItems, item]);
    }

    return (
        <Button onClick={() => addToCart(product)} type="button" label="Add to cart" icon="pi pi-shopping-cart" className="add-to-cart-btn" />
    )                         
}