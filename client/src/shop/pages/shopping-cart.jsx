import React, {useContext} from 'react'
import { ShopContext } from '../../context/shop-context'
import { CartItem } from './components/shopping-cart-item'

import { useNavigate } from 'react-router-dom'

export const ShoppingCart = () => {
    const { cartItems, getTotalCartAmount } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

    const navigate = useNavigate()
    return (
        <div className="cart">
            <div>
                <h1>Your Cart Items</h1>
                <div className="cartItems">
                    {PRODUCTS.map((product) => {
                        if(cartItems[product.id] !== 0) {
                            return <CartItem data={product} />
                        }
                    })}
                </div>
            </div>
            {totalAmount > 0 ? ( 
            <div className="checkout">
                <p> Subtotal: ${totalAmount} </p>
                <button onClick={() => navigate("/")}> Continue Shopping</button>
                <button> Checkout </button>
            </div>
            ) : (<h1> Your Cart Is Empty!</h1>
            )}
        </div>
    )
}