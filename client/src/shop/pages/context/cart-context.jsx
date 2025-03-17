import React, { createContext, useState, useContext } from 'react'

// Create a Cart Context
const CartContext = createContext()

// Create a custom hook to use the Cart Context
export const useCart = () => {
  return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
 
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product])
  }

  const removeFromCart = (product) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item !== product)
    )
  }

  // Calculate total price of the cart
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  )
}