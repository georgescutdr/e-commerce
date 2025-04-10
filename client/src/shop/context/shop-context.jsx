import { createContext, useState } from "react";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});

    const addToCart = (product) => {
        setCartItems(prev => {
            const prevQuantity = prev[product.id]?.quantity || 0;
            return {
                ...prev,
                [product.id]: {
                    ...product,
                    quantity: prevQuantity + 1,
                },
            };
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => {
            const updated = { ...prev };
            delete updated[productId];
            return updated;
        });
    };

    const updateQuantity = (productId, quantity) => {
        setCartItems(prev => ({
            ...prev,
            [productId]: {
                ...prev[productId],
                quantity: quantity < 1 ? 1 : quantity,
            },
        }));
    };

    return (
        <ShopContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
          {children}
        </ShopContext.Provider>
    );
};
